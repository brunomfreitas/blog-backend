import { IQuestaoRepository } from "@/repositories/questao.repository.interface";

export class ListAllUseCase {
  constructor(private repository: IQuestaoRepository) {}

  async handler(page: number, limit: number) {
    return this.repository.listAll(page, limit)
  }
}
