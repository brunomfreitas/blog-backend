// src/http/controllers/person/search.ts
import { PersonRepository } from "@/repositories/typeorm/person.repository";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { SearchPersonUseCase } from "@/use-case/person/search";
import { Request, Response } from "express";
import { z } from "zod";



export async function search(req: Request, res: Response) {

	const postSearchQuerySchema = z.object({
		q: z.string().trim().min(1, "Informe ?q"),
		type: z.string()
	});
		
	const { q, type } = postSearchQuerySchema.parse(req.query);

	const useCase = makeUseCase(SearchPersonUseCase, PersonRepository);
	const result = await useCase.handler({ q, type });
	return res.json(result);
}