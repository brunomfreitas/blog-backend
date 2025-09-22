import { CategoryRepository } from '@/repositories/typeorm/category.repository'
import { FindUseCase } from '@/use-case/category/find'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function find(req: Request, res: Response) {
  
	const registerParamsSchema = z.object({
    	id: z.coerce.number(),
  	})

  	const { id } = registerParamsSchema.parse(req.params)

  	const findUseCase = makeUseCase(FindUseCase, CategoryRepository)

	const data = await findUseCase.handler(id)

	return res.status(200).json(data)

}
