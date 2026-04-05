export type SaveRespostaDTO = {
  provaAlunoId: number;
  questaoId: number;
  alternativaId?: number | null;
  respostaLetra?: string | null;
  correta?: boolean | null;
};