/** Mantém os comentários @openapi no JS emitido */
export const __openapi_questao = true;

/**
 * @openapi
 * components:
 *   schemas:
 *     Questao:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Alice" }
 *         cpf: { type: string, example: "12345678901" }
 *         birth: { type: string, format: date, example: "1990-10-01" }
 *         email: { type: string, format: email, example: "alice@example.com" }
 *         status: { type: boolean, example: true }
 *
 *     CreateQuestao:
 *       type: object
 *       required: [name, cpf, birth, email, status]
 *       properties:
 *         name: { type: string }
 *         cpf: { type: string }
 *         birth: { type: string, format: date }
 *         email: { type: string, format: email }
 *         status: { type: boolean }
 *
 *     UpdateQuestao:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string }
 *         cpf: { type: string }
 *         birth: { type: string, format: date }
 *         email: { type: string, format: email }
 *         status: { type: boolean }
 */

/**
 * @openapi
 * /questao:
 *   get:
 *     summary: Listar questões (paginado)
 *     tags: [Questao]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       '200':
 *         description: Lista de questões
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Questao' }
 */

/**
 * @openapi
 * /questao:
 *   post:
 *     summary: Criar uma questão
 *     tags: [Questao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateQuestao' }
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Questao' }
 *       '400':
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */

/**
 * @openapi
 * /questao/{id}:
 *   get:
 *     summary: Buscar questao por ID
 *     tags: [Questao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Questao' }
 *       '404': { description: Não encontrada }
 */

/**
 * @openapi
 * /questao:
 *   put:
 *     summary: Atualizar uma questão
 *     tags: [Questao] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdateQuestao' }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Questao' }
 *       '404': { description: Não encontrada }
 */
export { };

