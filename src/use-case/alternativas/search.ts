// src/use-case/alternativas/search.ts
import { IAlternativasRepository } from "@/repositories/alternativas.repository.interface";

export class SearchAlternativasUseCase {
	constructor(private repo: IAlternativasRepository) {}

	async handler(input: { q: string; page: number; limit: number }) {
		const { q, page, limit } = input;
		const { data, total } = await this.repo.search(q, page, limit);
		return {
			query: q,
			data,
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
			hasNext: page * limit < total,
		};
	}
}
