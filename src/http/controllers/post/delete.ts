import { PostRepository } from '@/repositories/typeorm/post.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { DeletePostUseCase } from '@/use-case/post/delete-post'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function deletePost(req: Request, res: Response) {
  
	const registerParamsSchema = z.object({
    	id: z.coerce.number(),
  	})

  	const { id } = registerParamsSchema.parse(req.params)

  	const deleteUseCase = makeUseCase(DeletePostUseCase, PostRepository)

	const data = await deleteUseCase.handler(id)

	return res.status(200).json(data)

}
