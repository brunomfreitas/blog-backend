import { IProvaQuestaoRepository } from '@/repositories/prova-questao.repository.interface';

export class DeleteByProvaUseCase {
  constructor(private repository: IProvaQuestaoRepository) {}

  async handler(provaId: number) {
    return this.repository.deleteByProva(provaId);
  }
}