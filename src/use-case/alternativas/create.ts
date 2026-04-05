import { IAlternativasRepository } from "@/repositories/alternativas.repository.interface";
import { CreateAlternativasDTO } from "./alternativas-dtos";

export class CreateUseCase {
	constructor(private repository: IAlternativasRepository) {}

	handler(data: CreateAlternativasDTO) {
		return this.repository.create(data)
	}
}