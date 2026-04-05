import { IProvaRepository } from '@/repositories/prova.repository.interface'

export class FindUseCase {
  constructor(private repository: IProvaRepository) {}

  async handler(id: number, alunoId?: number) {
    return this.repository.findById(id, alunoId)
  }
}