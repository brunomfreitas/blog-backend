import { AlternativasRepository } from '@/repositories/typeorm/alternativas.repository'
import { UpdateAlternativasDTO } from '@/use-case/alternativas/alternativas-dtos'
import { UpdateUseCase } from '@/use-case/alternativas/update'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {

	const registerParamsSchema = z.object({
		id: z.coerce.number(),
  	})

	const { id } = registerParamsSchema.parse(req.params)

	const registerBodySchema = z.object({
		alternativa: z.string().optional(),
		questaoId: z.coerce.number().optional()
	});

	const data: UpdateAlternativasDTO = registerBodySchema.parse(req.body);
	const updateUseCase = makeUseCase(UpdateUseCase, AlternativasRepository);
	const alternativa = await updateUseCase.handler(id, data);

  	return res.status(200).json(alternativa);

}