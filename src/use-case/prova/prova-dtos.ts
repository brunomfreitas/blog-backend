// src/use-case/prova/prova-dto.ts
export type CreateProvaItemDTO = {
  categoryId: number
  quantidade: number
}

export type CreateProvaDTO = {
  descricao: string;
  createdBy: number;
  tempoProva: number;
  itens: {
    categoryId: number;
    quantidade: number;
  }[];
};

export type UpdateProvaDTO = {
  descricao?: string;
  tempoProva?: number;
  itens?: {
    categoryId: number;
    quantidade: number;
  }[];
};