export interface IProvaAlunoResposta {
  id?: number
  provaAlunoId: number
  questaoId: number
  alternativaId: number | null
  respostaLetra: string | null
  correto?: boolean | null
  createAt: Date
}