import { IProvaAlunoRepository } from '@/repositories/prova-aluno.repository.interface';
import { FinishProvaAlunoDTO } from './prova-aluno-dtos';

export class FinishProvaAlunoUseCase {
  constructor(private provaAlunoRepository: IProvaAlunoRepository) {}

  async handler(data: FinishProvaAlunoDTO) {
    return this.provaAlunoRepository.finish(data);
  }
}