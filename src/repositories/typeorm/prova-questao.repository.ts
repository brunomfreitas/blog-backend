import { ProvaQuestao } from '@/domain/entities/prova-questao.entity';
import { Prova } from '@/domain/entities/prova.entity';
import { Questao } from '@/domain/entities/questao.entity';
import { appDataSource } from '@/lib/typeorm/typeorm';
import { IProvaQuestaoRepository } from '@/repositories/prova-questao.repository.interface';
import { CreateProvaQuestaoDTO } from '@/use-case/prova-questao/prova-questao-dtos';
import { Repository } from 'typeorm';

export class ProvaQuestaoRepository implements IProvaQuestaoRepository {
  private provaQuestaoRepo: Repository<ProvaQuestao>;
  private provaRepo: Repository<Prova>;
  private questaoRepo: Repository<Questao>;

  constructor() {
    this.provaQuestaoRepo = appDataSource.getRepository(ProvaQuestao);
    this.provaRepo = appDataSource.getRepository(Prova);
    this.questaoRepo = appDataSource.getRepository(Questao);
  }

  async createMany(data: CreateProvaQuestaoDTO[]): Promise<ProvaQuestao[]> {
    const results: ProvaQuestao[] = [];

    for (const item of data) {
      const prova = await this.provaRepo.findOne({
        where: { id: item.provaId },
      });
      if (!prova) throw new Error(`Prova ${item.provaId} not found`);

      const questao = await this.questaoRepo.findOne({
        where: { id: item.questaoId },
      });
      if (!questao) throw new Error(`Questao ${item.questaoId} not found`);

      const created = this.provaQuestaoRepo.create({
        prova,
        questao,
        numeroQuestao: item.numeroQuestao,
      });

      const saved = await this.provaQuestaoRepo.save(created);
      results.push(saved);
    }

    return results;
  }

  async listByProva(provaId: number): Promise<ProvaQuestao[]> {
    return this.provaQuestaoRepo.find({
      where: {
        prova: { id: provaId },
      },
      relations: ['questao'],
      order: {
        numeroQuestao: 'ASC',
      },
    });
  }

  async deleteByProva(provaId: number): Promise<void> {
    await this.provaQuestaoRepo.delete({
      prova: { id: provaId },
    });
  }
}