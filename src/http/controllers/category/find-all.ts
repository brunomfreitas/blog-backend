import { CategoryRepository } from '@/repositories/typeorm/category.repository'
import { FindAllUseCase } from '@/use-case/category/find-all'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findAll(req: Request, res: Response) {
  
	const registerQuerySchema = z.object({
    	page: z.coerce.number().default(1),
    	limit: z.coerce.number().default(10),
  	})

  	const { page, limit } = registerQuerySchema.parse(req.query)

  	const findAllUseCase = makeUseCase(FindAllUseCase, CategoryRepository)

  	const data = await findAllUseCase.handler(page, limit)

  	return res.status(200).json(data)
}
