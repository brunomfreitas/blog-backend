import { IAlternativasRepository } from "@/repositories/alternativas.repository.interface";

export class ListUseCase {
	constructor(private repository: IAlternativasRepository) {}

	async handler(page: number, limit: number) {
		return this.repository.list(page, limit)
	}
}
