import { ICategory } from "@/domain/interfaces/category.interface"


export interface ICategoryRepository {  
  findAll(page: number, limit: number): Promise<ICategory[]>
  findById(id: number): Promise<ICategory | null>
  create(data: Omit<ICategory, 'id'>): Promise<ICategory>
  update(data: ICategory): Promise<ICategory>
  delete(id: string): Promise<void>
}
