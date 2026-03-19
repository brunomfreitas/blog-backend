import { IQuestaoRepository } from "@/repositories/questao.repository.interface";
import { UpdateQuestaoDTO } from "./questao-dtos";

export class UpdateUseCase {
	constructor(private repository: IQuestaoRepository) {}

	handler(id: number, data: UpdateQuestaoDTO) {
		return this.repository.update(id, data)
	}
}
