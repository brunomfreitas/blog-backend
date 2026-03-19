import { IQuestao } from "@/domain/interfaces/questao.interface"
import { CreateQuestaoDTO, UpdateQuestaoDTO } from "@/use-case/questao/questao-dtos"

export interface IQuestaoRepository {  
	list(page: number, limit: number, category: number | undefined): Promise<IQuestao[]>
	listAll(page: number, limit: number): Promise<IQuestao[]>
	findById(id: number): Promise<IQuestao | null>
	create(data: CreateQuestaoDTO): Promise<IQuestao>
	update(id:number, data: UpdateQuestaoDTO): Promise<IQuestao>
	delete(id: number): Promise<void>
	search(q: string, page: number, limit: number): Promise<{ data: IQuestao[]; total: number; }>;
}
