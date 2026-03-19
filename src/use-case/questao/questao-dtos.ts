// src/use-case/user/user-dto.ts
export type CreateQuestaoDTO = {
	enunciado: string
	resposta: string
	category: number
	escolaridade: number
	turno: number
	periodo: number
	tipoQuestao: number
	createdBy: number
	status: boolean
}

export type UpdateQuestaoDTO = {
	enunciado?: string | undefined
	resposta?: string | undefined
	category?: number | undefined
	escolaridade?: number | undefined
	turno?: number | undefined
	periodo?: number | undefined
	tipoQuestao?: number | undefined
	postedAt?: Date | undefined
	postedBy?: number | undefined
	status?: boolean | undefined
}
