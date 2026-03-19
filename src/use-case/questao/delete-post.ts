import { IQuestaoRepository } from '@/repositories/questao.repository.interface'
// import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class DeleteQuestaoUseCase {

  constructor(private repository: IQuestaoRepository) {}

  async handler(id: number) {
    
	const data = await this.repository.delete(id)

    // if (!person) throw new ResourceNotFoundError()

    return data
  }
}
