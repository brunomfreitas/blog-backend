import { IProvaAluno } from '@/domain/interfaces/prova-aluno.interface';
import { FinishProvaAlunoDTO, StartProvaAlunoDTO } from '@/use-case/prova-aluno/prova-aluno-dtos';

export interface IProvaAlunoRepository {
  findByProvaAndAluno(provaId: number, alunoId: number): Promise<IProvaAluno | null>;
  start(data: StartProvaAlunoDTO): Promise<IProvaAluno>;
  finish(data: FinishProvaAlunoDTO): Promise<IProvaAluno>;
}