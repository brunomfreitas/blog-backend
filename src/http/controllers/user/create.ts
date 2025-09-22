import { UserRepository } from "@/repositories/typeorm/user.repository";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { CreateUseCase } from "@/use-case/user/create";
import { CreateUserDTO } from "@/use-case/user/user-dtos";

import { Request, Response } from "express";
import { z } from 'zod';


const registerBodySchema = z.object({    
	personid: z.coerce.number(),
	login: z.string(),
	password: z.string(),		
	status: z.coerce.boolean().default(true),
})

export async function create(req: Request, res: Response) {

	const data: CreateUserDTO = registerBodySchema.parse(req.body)
	
	const createUserUseCase = makeUseCase(CreateUseCase, UserRepository);

	const user = await createUserUseCase.handler(data)

	return res.status(201).json(user)
}
