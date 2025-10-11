import { PersonRepository } from '@/repositories/typeorm/person.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { UpdateUseCase } from '@/use-case/person/update'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {

  	const registerBodySchema = z.object({    
		id: z.coerce.number(),
		name: z.string(),
		cpf: z.string(),
		birth: z.coerce.date(),
		email: z.string().email(),
		status: z.coerce.boolean(),
	})

  	const { id, name, cpf, birth, email, status } = registerBodySchema.parse(req.body)

  	const updateUseCase = makeUseCase(UpdateUseCase, PersonRepository)

  	const data = await updateUseCase.handler({
		id,
		name,
		cpf,
		birth,
		email,
		status
	})

  	return res.status(200).json(data)
}
