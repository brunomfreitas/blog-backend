import { PostStatusRepository } from '@/repositories/typeorm/post-status.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { FindUseCase } from '@/use-case/post-status/find'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function find(req: Request, res: Response) {
  
	const registerParamsSchema = z.object({	id: z.coerce.number() })

  	const { id } = registerParamsSchema.parse(req.params)

  	const findUseCase = makeUseCase(FindUseCase, PostStatusRepository)

	const data = await findUseCase.handler(id)

	return res.status(200).json(data)

}
