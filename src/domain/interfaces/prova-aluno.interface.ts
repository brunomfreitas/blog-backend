import { ProvaAlunoStatus } from '../enums/prova-aluno-status.enum';

export interface IProvaAluno {
  id?: number;
  provaId: number;
  alunoId: number;
  status: ProvaAlunoStatus;
  nota?: number | null;
  tempoGasto?: number | null;
  dataInicio?: Date | null;
  dataFim?: Date | null;
  createdAt?: Date;
}