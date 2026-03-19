import { QuestaoRepository } from "@/repositories/typeorm/questao.repository";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { CreateUseCase } from "@/use-case/questao/create";
import { CreateQuestaoDTO } from "@/use-case/questao/questao-dtos";
import { Request, Response } from "express";
import { z } from 'zod';

const registerBodySchema = z.object({
	enunciado: z.string(),
	resposta: z.string(),
	category: z.coerce.number(),
	escolaridade: z.coerce.number(),
	turno: z.coerce.number(),
	periodo: z.coerce.number(),
	tipoQuestao: z.coerce.number(),	
	createdBy: z.coerce.number(),	
	status: z.coerce.boolean()	
})

export async function create(req: Request, res: Response) {

	const data: CreateQuestaoDTO = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, QuestaoRepository);

	const questao = await createUseCase.handler(data)

	return res.status(201).json(questao)
}
