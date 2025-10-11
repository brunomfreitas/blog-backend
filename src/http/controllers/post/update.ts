import { PostRepository } from '@/repositories/typeorm/post.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { UpdatePostDTO } from '@/use-case/post/post-dtos'
import { UpdateUseCase } from '@/use-case/post/update'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {

	const registerParamsSchema = z.object({
		id: z.coerce.number(),
  	})

	const { id } = registerParamsSchema.parse(req.params)

	const registerBodySchema = z.object({
		title: z.string().min(1),
		subtitle: z.string(),
		message: z.string().min(1),
		image: z.string(),
		postedAt: z.coerce.date(),
		postedBy: z.coerce.number(),
		category: z.coerce.number(),
		status: z.coerce.number()
	})

	const data: UpdatePostDTO = registerBodySchema.parse(req.body)

	const updateUseCase = makeUseCase(UpdateUseCase, PostRepository)

	const post = await updateUseCase.handler(id, data)
	
  	return res.status(200).json(post)

}