import { CategoryRepository } from '@/repositories/typeorm/category.repository'
import { UpdateUseCase } from '@/use-case/category/update'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {

  	const registerBodySchema = z.object({    
		id: z.coerce.number(),
		name: z.string(),
		status: z.coerce.boolean()
	})

  	const { id, name, status } = registerBodySchema.parse(req.body)

  	const updateUseCase = makeUseCase(UpdateUseCase, CategoryRepository)

  	const data = await updateUseCase.handler({ id, name, status	})

  	return res.status(200).json(data)
}
