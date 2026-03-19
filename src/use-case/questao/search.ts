// src/use-case/post/search.ts

import { IQuestaoRepository } from "@/repositories/questao.repository.interface";

export class SearchquestaoUseCase {
  constructor(private repo: IQuestaoRepository) {}

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
