// import { AlternativasRepository } from '@/repositories/typeorm/alternativas.repository'
// import { UpdateAlternativasDTO } from '@/use-case/alternativas/alternativas-dtos'
// import { UpdateUseCase } from '@/use-case/alternativas/update'
// import { makeUseCase } from '@/use-case/factory/make-use-case'
// import { Request, Response } from 'express'
// import { z } from 'zod'

// export async function update(req: Request, res: Response) {

// 	const registerParamsSchema = z.object({
// 		id: z.coerce.number(),
//   	})

// 	const { id } = registerParamsSchema.parse(req.params)

// 	const registerBodySchema = z.object({
// 		alternativa: z.string().optional(),
// 		questaoId: z.coerce.number().optional()
// 	});

// 	const data: UpdateAlternativasDTO = registerBodySchema.parse(req.body);
// 	const updateUseCase = makeUseCase(UpdateUseCase, AlternativasRepository);
// 	const alternativa = await updateUseCase.handler(id, data);

//   	return res.status(200).json(alternativa);

// }



import { ProvaRepository } from '@/repositories/typeorm/prova.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { UpdateUseCase } from '@/use-case/prova/update'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.coerce.number()
})

const bodySchema = z.object({
  descricao: z.string().optional(),
  tempoProva: z.coerce.number(),
  itens: z.array(
    z.object({
      categoryId: z.coerce.number(),
      quantidade: z.coerce.number()
    })
  ).optional()
})

export async function update(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)
  const data = bodySchema.parse(req.body)

  const useCase = makeUseCase(UpdateUseCase, ProvaRepository)
  const prova = await useCase.handler(id, data)

  return res.status(200).json(prova)
}