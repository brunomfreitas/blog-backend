import { QuestaoRepository } from '@/repositories/typeorm/questao.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { UpdateQuestaoDTO } from '@/use-case/questao/questao-dtos'
import { UpdateUseCase } from '@/use-case/questao/update'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {

	const registerParamsSchema = z.object({
		id: z.coerce.number(),
  	})

	const { id } = registerParamsSchema.parse(req.params)

	const registerBodySchema = z.object({
		enunciado: z.string().optional(),
		resposta: z.string().optional(),
		category: z.coerce.number().optional(),
		escolaridade: z.coerce.number().optional(),
        turno: z.coerce.number().optional(),
		periodo: z.coerce.number().optional(),
		tipoQuestao: z.coerce.number().optional(),
		status: z.coerce.boolean().optional(),
		postedAt: z.coerce.date().optional(),
		postedBy: z.coerce.number().optional()
	});

	const data: UpdateQuestaoDTO = registerBodySchema.parse(req.body);

	const updateUseCase = makeUseCase(UpdateUseCase, QuestaoRepository);

	const questao = await updateUseCase.handler(id, data);

  	return res.status(200).json(questao);

}