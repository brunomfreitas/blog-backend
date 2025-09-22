import { PostStatusRepository } from '@/repositories/typeorm/post-status.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { FindAllUseCase } from '@/use-case/post-status/find-all'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findAll(req: Request, res: Response) {
  
	const registerQuerySchema = z.object({
    	page: z.coerce.number().default(1),
    	limit: z.coerce.number().default(10),
  	})

  	const { page, limit } = registerQuerySchema.parse(req.query)

  	const findAllUseCase = makeUseCase(FindAllUseCase, PostStatusRepository)

  	const data = await findAllUseCase.handler(page, limit)

  	return res.status(200).json(data)
}
