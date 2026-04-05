import { SaveRespostaDTO } from '@/use-case/prova-aluno-resposta/prova-aluno-resposta-dtos';

export interface IProvaAlunoRespostaRepository {
  saveMany(data: SaveRespostaDTO[]): Promise<any[]>;
  listByProvaAluno(provaAlunoId: number): Promise<any[]>;
}