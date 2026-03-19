// src/http/controllers/post/search.ts
import { QuestaoRepository } from "@/repositories/typeorm/questao.repository";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { SearchquestaoUseCase } from "@/use-case/questao/search";
import { Request, Response } from "express";
import { z } from "zod";

const questaoSearchQuerySchema = z.object({
	q: z.string().trim().min(1, "Informe ?q"),
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().positive().max(100).default(10),
});

export async function search(req: Request, res: Response) {
	const { q, page, limit } = questaoSearchQuerySchema.parse(req.query);
	const useCase = makeUseCase(SearchquestaoUseCase, QuestaoRepository);
	const result = await useCase.handler({ q, page, limit });
	return res.json(result);
}