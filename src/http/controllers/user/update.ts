import { UserRepository } from '@/repositories/typeorm/user.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { UpdateUseCase } from '@/use-case/user/update'
import { UpdateUserDTO } from '@/use-case/user/user-dtos'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {
  

  	const registerBodySchema = z.object({    
		id: z.coerce.number(),
		personid: z.coerce.number(),
		login: z.string(),
		password: z.string(),		
		status: z.coerce.boolean(),
	})

  	const data: UpdateUserDTO = registerBodySchema.parse(req.body)

  	const updateUseCase = makeUseCase(UpdateUseCase, UserRepository)

  	const user = await updateUseCase.handler(data)

  	return res.status(200).json(user)
}
