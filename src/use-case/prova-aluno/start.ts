import { IProvaAlunoRepository } from '@/repositories/prova-aluno.repository.interface';
import { StartProvaAlunoDTO } from './prova-aluno-dtos';

export class StartProvaAlunoUseCase {
  constructor(private provaAlunoRepository: IProvaAlunoRepository) {}

  async handler(data: StartProvaAlunoDTO) {
    return this.provaAlunoRepository.start(data);
  }
}