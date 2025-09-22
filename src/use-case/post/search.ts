// src/use-case/post/search.ts

import { IPostRepository } from "@/repositories/post.repository.interface";

export class SearchPostsUseCase {
  constructor(private repo: IPostRepository) {}

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
