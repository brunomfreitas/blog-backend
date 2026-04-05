// src/repositories/typeorm/alternativas.repository.ts
import { Alternativas } from '@/domain/entities/alternativas.entity'
import { Questao } from '@/domain/entities/questao.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { CreateAlternativasDTO, UpdateAlternativasDTO } from '@/use-case/alternativas/alternativas-dtos'
import { ILike, Repository } from 'typeorm'

export class AlternativasRepository {
	private repository: Repository<Alternativas>  
	private questaoRepo: Repository<Questao>

	constructor() {
		this.repository = appDataSource.getRepository(Alternativas)    
		this.questaoRepo = appDataSource.getRepository(Questao)
	}

	async list(page: number, limit: number): Promise<Alternativas[]> {
		const now = new Date();
		return this.repository.find({		    
			relations: ['alternativaQuestao'],
			// skip: (page - 1) * limit,
			// take: limit,
		})
	}

	async listAll(page: number, limit: number, questaoId: number): Promise<Alternativas[]> {
		return this.repository.find({
			where: {			
				questaoId: questaoId			
			},
			order: { id: 'DESC' },
			relations: ['alternativaQuestao'],
			skip: (page - 1) * limit,
			take: limit,
		})
	}

	async findById(id: number): Promise<Alternativas | null> {
		return this.repository.findOne({
		where: { id },
		relations: ['alternativaQuestao'],
		})
	}

	async create(data: CreateAlternativasDTO): Promise<Alternativas> {
		
		const questao = await this.questaoRepo.findOne({ where: { id: data.questaoId }})	
		
		if (!questao) throw new Error('Questao not found')
		
		const alternativa = {
			alternativa: data.alternativa,
			alternativaQuestao: questao,
			questaoId: data.questaoId
		}

		const entity = this.repository.create(alternativa)

		return this.repository.save(entity)
	}

	async update(id: number, data: UpdateAlternativasDTO): Promise<Alternativas> {

		 // 1) Carrega o post por id
		const post = await this.repository.findOne({ where: { id } });
		if (!post) {
			const err: any = new Error('Post not found');
			err.status = 404;
			throw err;
		}
		
		const questao = await this.questaoRepo.findOne({ where: { id: data.questaoId } })
		
		if (!questao) throw new Error('Questao not found')
		
		const partial: Partial<Alternativas> = {
			id: id,			
			alternativa: data.alternativa,
			alternativaQuestao: questao,
			questaoId: data.questaoId
		}

		const entity = await this.repository.preload(partial)
		if (!entity) throw new Error('Questao not found')

    	return this.repository.save(entity)
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id)
	}

	async search(q: string, page: number, limit: number) {
		const now = new Date();

		const where = [
			{ alternativa: ILike(`%${q}%`) }
		];

		const [rows, total] = await this.repository.findAndCount({
			where: where.map((condition) => ({
				...condition
			})),
			relations: ['alternativaQuestao'],			
			skip: (page - 1) * limit,
			take: limit,
		});

		return { data: rows, total };
	}
	
}