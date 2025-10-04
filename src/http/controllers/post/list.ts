import { PostRepository } from '@/repositories/typeorm/post.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { ListUseCase } from '@/use-case/post/list'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function list(req: Request, res: Response) {
  
	const registerQuerySchema = z.object({
    	page: z.coerce.number().default(1),
    	limit: z.coerce.number().default(10),
  	})

  	const { page, limit } = registerQuerySchema.parse(req.query)

  	const listUseCase = makeUseCase(ListUseCase, PostRepository)

  	const data = await listUseCase.handler(page, limit)

  	return res.status(200).json(data)
}
