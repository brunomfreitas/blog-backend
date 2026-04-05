import { IProvaRepository } from '@/repositories/prova.repository.interface';
import { CreateProvaDTO } from './prova-dtos';

export class CreateUseCase {
  constructor(private repository: IProvaRepository) {}

  async handler(data: CreateProvaDTO) {
	console.log('CreateProvaDTO', data);
    return this.repository.create(data)
  }
}