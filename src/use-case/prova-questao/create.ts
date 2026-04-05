import { IProvaQuestaoRepository } from '@/repositories/prova-questao.repository.interface';
import { CreateProvaQuestaoDTO } from './prova-questao-dtos';

export class CreateManyProvaQuestaoUseCase {
  constructor(private repository: IProvaQuestaoRepository) {}

  async handler(data: CreateProvaQuestaoDTO[]) {
    return this.repository.createMany(data);
  }
}