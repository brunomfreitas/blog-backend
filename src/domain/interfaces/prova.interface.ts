export interface IProvaQuestao {
  id?: number
  questaoId: number
  numeroQuestao: number
  enunciado?: string
  resposta?: string
  escolaridade?: number
  turno?: number
  periodo?: number
  tipoQuestao?: number
  category?: number
  status?: boolean
  alternativas?: { id: number; alternativa: string }[]
}

export interface IProvaAlunoResumo {
  id?: number
  status: string
  nota?: number | null
  tempoGasto?: number | null
  dataInicio?: Date | null
  dataFim?: Date | null
}

export interface IProva {
  id?: number
  descricao: string
  tempoProva: number
  createdAt?: Date
  createdBy: number
  questoes?: IProvaQuestao[]
  provaAluno?: IProvaAlunoResumo | null
}