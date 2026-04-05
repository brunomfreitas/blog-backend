export type CreateProvaQuestaoDTO = {
  provaId: number;
  questaoId: number;
  numeroQuestao: number;
};

export type CreateManyProvaQuestaoDTO = {
  itens: CreateProvaQuestaoDTO[];
};