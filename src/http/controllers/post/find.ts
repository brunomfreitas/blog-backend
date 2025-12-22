import { PostRepository } from '@/repositories/typeorm/post.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { FindUseCase } from '@/use-case/post/find'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function find(req: Request, res: Response) {
  
	const registerParamsSchema = z.object({
    	id: z.coerce.number(),
  	})

	console.log("req.query", req.query);
  	console.log("req.body", req.body);
	console.log("req.params", req.params);
	const { id } = registerParamsSchema.parse(req.params)

  	const findUseCase = makeUseCase(FindUseCase, PostRepository)

	const data = await findUseCase.handler(id)

	return res.status(200).json(data)

}
