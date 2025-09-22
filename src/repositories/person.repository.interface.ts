import { IPerson } from "@/domain/interfaces/person.interface";

export interface IPersonRepository {  
  findAll(page: number, limit: number): Promise<IPerson[]>
  findById(id: number): Promise<IPerson | null>
  create(data: Omit<IPerson, 'id'>): Promise<IPerson>
  update(data: IPerson): Promise<IPerson>
  delete(id: string): Promise<void>
}
