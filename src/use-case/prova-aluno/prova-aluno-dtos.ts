import { ProvaAlunoStatus } from '@/domain/enums/prova-aluno-status.enum';

export type StartProvaAlunoDTO = {
  provaId: number;
  alunoId: number;
};

export type FinishProvaAlunoDTO = {
  provaId: number;
  alunoId: number;
//   status: ProvaAlunoStatus.FINALIZADA | ProvaAlunoStatus.EXPIRADA;
  status: ProvaAlunoStatus;
  nota: number;
  tempoGasto: number;
};