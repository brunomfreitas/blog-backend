/** Mantém os comentários @openapi no JS emitido */
export const __openapi_prova = true;

/**
 * @openapi
 * components:
 *   schemas:
 *     Prova:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         descricao: { type: string, example: "Prova de Matemática - 1º Bimestre" }
 *         tempoProva: { type: integer, example: 50 }
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-30T12:00:00.000Z"
 *         createdBy: { type: integer, example: 1 }
 *
 *     ProvaItem:
 *       type: object
 *       properties:
 *         categoryId: { type: integer, example: 1 }
 *         quantidade: { type: integer, example: 5 }
 *
 *     ProvaQuestao:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         questaoId: { type: integer, example: 10 }
 *         numeroQuestao: { type: integer, example: 1 }
 *         enunciado: { type: string, example: "Quanto é 2 + 2?" }
 *         resposta: { type: string, example: "A" }
 *         category: { type: integer, example: 1 }
 *
 *     ProvaDetalhada:
 *       allOf:
 *         - $ref: '#/components/schemas/Prova'
 *         - type: object
 *           properties:
 *             questoes:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProvaQuestao'
 *
 *     CreateProva:
 *       type: object
 *       required: [descricao, createdBy, itens]
 *       properties:
 *         descricao: { type: string, example: "Prova Multidisciplinar - 6º Ano" }
 *         createdBy: { type: integer, example: 1 }
 *         tempoProva: { type: integer, example: 50 }
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProvaItem'
 *
 *     UpdateProva:
 *       type: object
 *       properties:
 *         descricao: { type: string, example: "Prova Multidisciplinar - versão ajustada" }
 *         tempoProva: { type: integer, example: 50 }
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProvaItem'
 */

/**
 * @openapi
 * /prova:
 *   get:
 *     summary: Listar provas (paginado)
 *     tags: [Prova]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       '200':
 *         description: Lista de provas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Prova' }
 */

/**
 * @openapi
 * /prova:
 *   post:
 *     summary: Gerar uma nova prova automaticamente
 *     tags: [Prova]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateProva' }
 *     responses:
 *       '201':
 *         description: Prova gerada com sucesso
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ProvaDetalhada' }
 *       '400':
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */

/**
 * @openapi
 * /prova/{id}:
 *   get:
 *     summary: Buscar prova por ID
 *     tags: [Prova]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: Prova encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ProvaDetalhada' }
 *       '404': { description: Não encontrada }
 */

/**
 * @openapi
 * /prova:
 *   put:
 *     summary: Atualizar uma prova (regerar questões opcionalmente)
 *     tags: [Prova]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdateProva' }
 *     responses:
 *       '200':
 *         description: Prova atualizada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ProvaDetalhada' }
 *       '404': { description: Não encontrada }
 */

/**
 * @openapi
 * /prova/{id}:
 *   delete:
 *     summary: Remover uma prova
 *     tags: [Prova]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: Prova removida com sucesso
 *       '404':
 *         description: Não encontrada
 */
export { };

