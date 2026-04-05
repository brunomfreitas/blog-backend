// src/use-case/alternativas/alternativas-dto.ts
export type CreateAlternativasDTO = {
	alternativa: string
	questaoId: number	
}

export type UpdateAlternativasDTO = {	
	alternativa?: string | undefined
	questaoId?: number | undefined
}
