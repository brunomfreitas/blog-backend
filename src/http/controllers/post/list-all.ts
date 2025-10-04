import { PostRepository } from '@/repositories/typeorm/post.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { ListAllUseCase } from '@/use-case/post/listAll'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function listAll(req: Request, res: Response) {
  
	const registerQuerySchema = z.object({
    	page: z.coerce.number().default(1),
    	limit: z.coerce.number().default(10),
  	})

  	const { page, limit } = registerQuerySchema.parse(req.query)

  	const listAllUseCase = makeUseCase(ListAllUseCase, PostRepository)

  	const data = await listAllUseCase.handler(page, limit)

  	return res.status(200).json(data)
}
