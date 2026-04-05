import { IAlternativasRepository } from "@/repositories/alternativas.repository.interface";
import { UpdateAlternativasDTO } from "./alternativas-dtos";

export class UpdateUseCase {
	constructor(private repository: IAlternativasRepository) {}

	handler(id: number, data: UpdateAlternativasDTO) {
		return this.repository.update(id, data)
	}
}
