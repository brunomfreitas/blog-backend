import { IProva } from '@/domain/interfaces/prova.interface'
import { CreateProvaDTO, UpdateProvaDTO } from '@/use-case/prova/prova-dtos'

export interface IProvaRepository {
  list(page: number, limit: number, alunoId?: number, status?: string): Promise<IProva[]>
  findById(id: number, alunoId?: number): Promise<IProva | null>
  create(data: CreateProvaDTO): Promise<IProva>
  update(id: number, data: UpdateProvaDTO): Promise<IProva>
  delete(id: number): Promise<void>
}