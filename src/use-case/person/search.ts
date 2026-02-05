// src/use-case/person/search.ts

import { IPersonRepository } from "@/repositories/person.repository.interface";

export class SearchPersonUseCase {
  constructor(private repo: IPersonRepository) {}

  async handler(input: { q: string; type: string}) {
    const { q ,type } = input;
    const { data } = await this.repo.search(q, type);
    return data;
  }
}
