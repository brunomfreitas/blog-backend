import { IPostStatus } from "@/domain/interfaces/post-status.interface"

export interface IPostStatusRepository {  
  findAll(page: number, limit: number): Promise<IPostStatus[]>
  findById(id: number): Promise<IPostStatus | null>
  create(data: Omit<IPostStatus, 'id'>): Promise<IPostStatus>
  update(data: IPostStatus): Promise<IPostStatus>
  delete(id: string): Promise<void>
}
