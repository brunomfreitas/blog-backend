import { IAlternativasRepository } from "@/repositories/alternativas.repository.interface";

export class ListAllUseCase {
	constructor(private repository: IAlternativasRepository) {}

	async handler(page: number, limit: number, questaoId: number) {
		return this.repository.listAll(page, limit, questaoId);
	}
}
