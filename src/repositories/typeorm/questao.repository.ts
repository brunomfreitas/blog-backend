// src/repositories/typeorm/questao.repository.ts
import { Category } from '@/domain/entities/category.entity'
import { Person } from '@/domain/entities/person.entity'
import { Questao } from '@/domain/entities/questao.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { CreateQuestaoDTO, UpdateQuestaoDTO } from '@/use-case/questao/questao-dtos'
import { ILike, Repository } from 'typeorm'

export class QuestaoRepository {
  private repository: Repository<Questao>
  private createdByRepo: Repository<Person>
  private postedByRepo: Repository<Person>
  private questaoMateriaRepo: Repository<Category>

  constructor() {
    this.repository = appDataSource.getRepository(Questao)
    this.createdByRepo = appDataSource.getRepository(Person)
	this.postedByRepo = appDataSource.getRepository(Person)	
  	this.questaoMateriaRepo = appDataSource.getRepository(Category)
  }

  async list(page: number, limit: number, category: number): Promise<Questao[]> {
	const now = new Date();

	return this.repository.find({
		where: {			
			status: true			
		},
	    order: { postedAt: 'DESC', id: 'DESC' },
      	relations: ['createdByPerson', 'postedByPerson', 'questaoMateria'],
		// skip: (page - 1) * limit,
      	// take: limit,
    })
  }

  async listAll(page: number, limit: number): Promise<Questao[]> {
    return this.repository.find({
		order: { id: 'DESC' },
      	relations: ['createdByPerson', 'postedByPerson', 'questaoMateria'],
	  	skip: (page - 1) * limit,
    	take: limit,
    })
  }

  async findById(id: number): Promise<Questao | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['createdByPerson', 'postedByPerson', 'questaoMateria'],
    })
  }

  async create(data: CreateQuestaoDTO): Promise<Questao> {
    
	const creator = await this.createdByRepo.findOne({ where: { id: data.createdBy } })
	const materia = await this.questaoMateriaRepo.findOne({ where: { id: data.category } })
    
	if (!creator) throw new Error('Person not found')
	
	if (!materia) throw new Error('Materia not found')
    
	const questao = {
		enunciado: data.enunciado,
		resposta: data.resposta,
		category: data.category,
		escolaridade: data.escolaridade,
		turno: data.turno,
		periodo: data.periodo,
		tipoQuestao: data.tipoQuestao,
		createdBy: data.createdBy,
		createdByPerson: creator,
		questaoMateria: materia,
		status: data.status,
	}

    const entity = this.repository.create(questao)

    return this.repository.save(entity)
  }

	async update(id: number, data: UpdateQuestaoDTO): Promise<Questao> {

		 // 1) Carrega o post por id
		const post = await this.repository.findOne({ where: { id } });
		if (!post) {
			const err: any = new Error('Post not found');
			err.status = 404;
			throw err;
		}

		const postedByPerson = await this.createdByRepo.findOne({ where: { id: data.postedBy } })		
		const materia = await this.questaoMateriaRepo.findOne({ where: { id: data.category } })

		const partial: Partial<Questao> = {
			id: id,			
			enunciado: data.enunciado,
			resposta: data.resposta,
			category: data.category,
			questaoMateria: materia,
			escolaridade: data.escolaridade,
			turno: data.turno,
			periodo: data.periodo,
			tipoQuestao: data.tipoQuestao,
			postedAt: data.postedAt,
			postedBy: data.postedBy,
			postedByPerson: postedByPerson,			
			status: data.status
		}
		
		if (data.postedBy === null) {  
			partial.postedByPerson = null
		} else if (typeof data.postedBy === 'number') {
				
		const person = await this.postedByRepo.findOne({ where: { id: data.postedBy } })
			if (!person) throw new Error('Person not found')
				partial.postedByPerson = person
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
			{ enunciado: ILike(`%${q}%`) },
			// { message: ILike(`%${q}%`) },
			// { subtitle: ILike(`%${q}%`) },
		];

		const [rows, total] = await this.repository.findAndCount({
			where: where.map((condition) => ({
			...condition,
			status: true,
			// postedAt: LessThanOrEqual(now),
			})),
			relations: ['createdByPerson', 'postedByPerson', 'questaoMateria'],
			order: { createdAt: "DESC" },
			skip: (page - 1) * limit,
			take: limit,
		});

		return { data: rows, total };
	}
	
}