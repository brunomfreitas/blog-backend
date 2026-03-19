import { IQuestaoRepository } from "@/repositories/questao.repository.interface";
import { CreateQuestaoDTO } from "./questao-dtos";

export class CreateUseCase {
	constructor(private repository: IQuestaoRepository) {}

	handler(data: CreateQuestaoDTO) {
		return this.repository.create(data)
	}
}