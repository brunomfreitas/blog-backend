// import { IAlternativasRepository } from "@/repositories/alternativas.repository.interface";
// import { UpdateAlternativasDTO } from "./prova-dtos";

// export class UpdateUseCase {
// 	constructor(private repository: IAlternativasRepository) {}

// 	handler(id: number, data: UpdateAlternativasDTO) {
// 		return this.repository.update(id, data)
// 	}
// }





import { IProvaRepository } from '@/repositories/prova.repository.interface'
import { UpdateProvaDTO } from './prova-dtos'

export class UpdateUseCase {
  constructor(private repository: IProvaRepository) {}

  async handler(id: number, data: UpdateProvaDTO) {	
    return this.repository.update(id, data)
  }
}