import { IQuestaoRepository } from "@/repositories/questao.repository.interface";

export class ListUseCase {
  constructor(private repository: IQuestaoRepository) {}

  async handler(page: number, limit: number, category: number | undefined) {
    return this.repository.list(page, limit, category)
  }
}
