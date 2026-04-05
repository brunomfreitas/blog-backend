import { AlternativasRepository } from "@/repositories/typeorm/alternativas.repository";
import { CreateAlternativasDTO } from "@/use-case/alternativas/alternativas-dtos";
import { CreateUseCase } from "@/use-case/alternativas/create";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { Request, Response } from "express";
import { z } from 'zod';

const registerBodySchema = z.object({
	alternativa: z.string(),	
	questaoId: z.coerce.number()
})

export async function create(req: Request, res: Response) {
	const data: CreateAlternativasDTO = registerBodySchema.parse(req.body);	
	const createUseCase = makeUseCase(CreateUseCase, AlternativasRepository);
	const alternativa = await createUseCase.handler(data);
	return res.status(201).json(alternativa);
}
