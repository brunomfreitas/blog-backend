export interface IQuestao {
  id?: number
  enunciado: string
  resposta: string
  category: number /* materias */
  escolaridade: number
  turno: number
  periodo: number
  tipoQuestao: number

  createdAt: Date
  createdBy: number
  postedAt?: Date | null
  postedBy?: number | null
  
  status: boolean
}
