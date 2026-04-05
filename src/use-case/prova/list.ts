import { IProvaRepository } from '@/repositories/prova.repository.interface'

export class ListUseCase {
  constructor(private repository: IProvaRepository) {}

  async handler(page: number, limit: number, alunoId?: number, status?: string) {
    return this.repository.list(page, limit, alunoId, status)
  }
}