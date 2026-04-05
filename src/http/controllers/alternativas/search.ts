// src/http/controllers/post/search.ts
import { AlternativasRepository } from "@/repositories/typeorm/alternativas.repository";
import { SearchAlternativasUseCase } from "@/use-case/alternativas/search";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

const alternativaSearchQuerySchema = z.object({
	q: z.string().trim().min(1, "Informe ?q"),
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().positive().max(100).default(10),
});

export async function search(req: Request, res: Response) {

	const { q, page, limit } = alternativaSearchQuerySchema.parse(req.query);
	
	const useCase = makeUseCase(SearchAlternativasUseCase, AlternativasRepository);
	const result = await useCase.handler({ q, page, limit });
	
	return res.json(result);
}