import { AlternativasRepository } from '@/repositories/typeorm/alternativas.repository'
import { FindUseCase } from '@/use-case/alternativas/find'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function find(req: Request, res: Response) {
  
	const registerParamsSchema = z.object({
    	id: z.coerce.number(),
  	});
	
	const { id } = registerParamsSchema.parse(req.params);
  	const findUseCase = makeUseCase(FindUseCase, AlternativasRepository);
	const data = await findUseCase.handler(id);

	return res.status(200).json(data);

}
