/** Mantém os comentários @openapi no JS emitido */
export const __openapi_alternativas = true;

/**
 * @openapi
 * components:
 *   schemas:
 *     Alternativas:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         alternativa: { type: string, example: "Alice" }
 *         questaoId: { type: number, example: 1 } 
 *
 *     CreateAlternativas:
 *       type: object
 *       required: [alternativa, questaoId]
 *       properties:
 *         alternativa: { type: string }
 *         questaoId: { type: number } 
 *
 *     UpdateAlternativa:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         alternativa: { type: string }
 *         questaoId: { type: number } 
 */

/**
 * @openapi
 * /alternativas:
 *   get:
 *     summary: Listar Alternativas (paginado)
 *     tags: [Alternativas]
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
 *               items: { $ref: '#/components/schemas/Alternativas' }
 */

/**
 * @openapi
 * /alternativas:
 *   post:
 *     summary: Criar uma questão
 *     tags: [Alternativas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateAlternativas' }
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Alternativas' }
 *       '400':
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */

/**
 * @openapi
 * /alternativas/{id}:
 *   get:
 *     summary: Buscar Alternativa por ID
 *     tags: [Alternativas]
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
 *             schema: { $ref: '#/components/schemas/Alternativas' }
 *       '404': { description: Não encontrada }
 */

/**
 * @openapi
 * /alternativas:
 *   put:
 *     summary: Atualizar uma Alternativas
 *     tags: [Alternativas] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdateAlternativas' }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Alternativas' }
 *       '404': { description: Não encontrada }
 */
export { };

