import { IProvaQuestao } from '@/domain/interfaces/prova-questao.interface';
import { CreateProvaQuestaoDTO } from '@/use-case/prova-questao/prova-questao-dtos';

export interface IProvaQuestaoRepository {
  createMany(data: CreateProvaQuestaoDTO[]): Promise<IProvaQuestao[]>;
  listByProva(provaId: number): Promise<IProvaQuestao[]>;
  deleteByProva(provaId: number): Promise<void>;
}