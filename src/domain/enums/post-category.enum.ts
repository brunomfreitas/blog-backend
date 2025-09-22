// src/domain/enums/post-category.enum.ts
export enum PostCategory {
  Noticias = 1,
  Tutoriais = 2,
  Opiniao = 3,
  Tech = 4,
  Saude = 5,
  Esportes = 6,
  Entretenimento = 7,
  Educacao = 8,
  Outros = 9,
}

// lista numérica (útil para CHECK/migrations/Select options)
export const POST_CATEGORY_VALUES = Object.values(PostCategory).filter(
  (v) => typeof v === 'number'
) as number[];

// labels amigáveis (UI / responses)
export const POST_CATEGORY_LABEL: Record<PostCategory, string> = {
  [PostCategory.Noticias]: 'Notícias',
  [PostCategory.Tutoriais]: 'Tutoriais',
  [PostCategory.Opiniao]: 'Opinião',
  [PostCategory.Tech]: 'Tech',
  [PostCategory.Saude]: 'Saúde',
  [PostCategory.Esportes]: 'Esportes',
  [PostCategory.Entretenimento]: 'Entretenimento',
  [PostCategory.Educacao]: 'Educação',
  [PostCategory.Outros]: 'Outros',
};
