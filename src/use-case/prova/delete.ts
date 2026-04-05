// import { ResourceNotFoundError } from './errors/resource-not-found-error'
// import { IAlternativasRepository } from "@/repositories/alternativas.repository.interface";

// export class DeleteAlternativasUseCase {

// 	constructor(private repository: IAlternativasRepository) {}

//   	async handler(id: number) {    
// 		const data = await this.repository.delete(id);
//     	// if (!person) throw new ResourceNotFoundError();
//     	return data;
//   	}
// }


import { IProvaRepository } from '@/repositories/prova.repository.interface';

export class DeleteUseCase {
  constructor(private repository: IProvaRepository) {}

  async handler(id: number) {
    await this.repository.delete(id);
    return { message: 'Prova removida com sucesso.' }
  }
}