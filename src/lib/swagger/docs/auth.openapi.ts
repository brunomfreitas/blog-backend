/**
 * @openapi
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required: [login, password]
 *       properties:
 *         login: { type: string, example: "bruno" }
 *         password: { type: string, example: "123456" }
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token: { type: string, example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Autentica e retorna JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginInput' }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/LoginResponse' }
 *       '401': { description: Credenciais inválidas }
 */
export { };

