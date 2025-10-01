/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "My first post" }
 *         subtitle: { type: string, nullable: true, example: "Hello" }
 *         message: { type: string, example: "lorem ipsum" }
 *         image: { type: string, nullable: true, example: "https://cdn/cover.png" }
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-30T12:00:00.000Z"
 *         postedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-10-01T09:00:00.000Z"
 *         createdBy: { type: integer, example: 42 }
 *         postedBy: { type: integer, nullable: true, example: 84 }
 *         category: { type: integer, example: 3 }
 *         status:
 *           type: string
 *           enum: [DRAFT, PUBLISHED]
 *           example: PUBLISHED
 *
 *     CreatePost:
 *       type: object
 *       required: [title, message, status]
 *       properties:
 *         title: { type: string, example: "My first post" }
 *         subtitle: { type: string, nullable: true }
 *         message: { type: string }
 *         image: { type: string, nullable: true }
 *         category: { type: integer, example: 3 }
 *         status:
 *           type: string
 *           enum: [DRAFT, PUBLISHED]
 *
 *     UpdatePost:
 *       type: object
 *       properties:
 *         title: { type: string }
 *         subtitle: { type: string, nullable: true }
 *         message: { type: string }
 *         image: { type: string, nullable: true }
 *         category: { type: integer }
 *         status:
 *           type: string
 *           enum: [DRAFT, PUBLISHED]
 */
export { };

