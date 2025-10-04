import { PersonRepository } from "@/repositories/typeorm/person.repository";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { CreatePersonUseCase } from "@/use-case/person/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response) {

	const registerBodySchema = z.object({    
		name: z.string(),
		cpf: z.string(),
		birth: z.coerce.date(),
		email: z.string().email(),
		status: z.coerce.boolean(),
	})

	const { cpf, name, birth, email, status } = registerBodySchema.parse(req.body)
	
	const createPersonUseCase = makeUseCase(CreatePersonUseCase, PersonRepository);

	const person = await createPersonUseCase.handler({
		cpf,
		name,
		birth,
		email,
		status: status ?? true
	})

	return res.status(201).json(person)
}
