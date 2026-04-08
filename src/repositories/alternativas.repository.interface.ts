import { IAlternativas } from "@/domain/interfaces/alternativas.interface"
import { CreateAlternativasDTO, UpdateAlternativasDTO } from "@/use-case/alternativas/alternativas-dtos"

export interface IAlternativasRepository {  
	list(page: number, limit: number): Promise<IAlternativas[]>
	listAll(page: number, limit: number, questaoId: number): Promise<IAlternativas[]>
	findById(id: number): Promise<IAlternativas[]>
	create(data: CreateAlternativasDTO): Promise<IAlternativas>
	update(id:number, data: UpdateAlternativasDTO): Promise<IAlternativas>
	delete(id: number): Promise<void>
	search(q: string, page: number, limit: number): Promise<{ data: IAlternativas[]; total: number; }>;
}
