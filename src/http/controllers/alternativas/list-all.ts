import { AlternativasRepository } from '@/repositories/typeorm/alternativas.repository'
import { ListAllUseCase } from '@/use-case/alternativas/listAll'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function listAll(req: Request, res: Response) {
  
	const registerQuerySchema = z.object({
    	page: z.coerce.number().default(1),
    	limit: z.coerce.number().default(10),
		questaoId: z.coerce.number()
  	});

  	const { page, limit, questaoId } = registerQuerySchema.parse(req.query);
  	const listAllUseCase = makeUseCase(ListAllUseCase, AlternativasRepository);
  	const data = await listAllUseCase.handler(page, limit, questaoId);

  	return res.status(200).json(data);
}
