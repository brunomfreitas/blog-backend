import { PostStatusRepository } from '@/repositories/typeorm/post-status.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { UpdateUseCase } from '@/use-case/post-status/update'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {

  	const registerBodySchema = z.object({    
		id: z.coerce.number(),
		name: z.string(),
		status: z.coerce.boolean()
	})

  	const { id, name, status } = registerBodySchema.parse(req.body)

  	const updateUseCase = makeUseCase(UpdateUseCase, PostStatusRepository)

  	const data = await updateUseCase.handler({ id, name, status	})

  	return res.status(200).json(data)
}
