import { AlternativasRepository } from '@/repositories/typeorm/alternativas.repository'
import { ListUseCase } from '@/use-case/alternativas/list'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function list(req: Request, res: Response) {
  
	const registerQuerySchema = z.object({
    	page: z.coerce.number().default(1),
    	limit: z.coerce.number().default(10)
  	});

  	const { page, limit } = registerQuerySchema.parse(req.query);
  	const listUseCase = makeUseCase(ListUseCase, AlternativasRepository);
  	const data = await listUseCase.handler(page, limit);

  	return res.status(200).json(data);
}
