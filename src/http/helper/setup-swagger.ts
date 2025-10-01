// src/infra/http/setup-swagger.ts
import { env } from '@/env';
import type { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export function setupSwagger(app: Express) {

  const isProd = env.NODE_ENV === 'production';

  const apiGlobs = isProd
    ? [
        // build em JS
        'dist/http/controllers/**/*.js',
        'dist/http/routes/**/*.js',
        'dist/http/docs/**/*.js',
      ]
    : [
        // dev em TS
        'src/http/controllers/**/*.ts',
        'src/http/routes/**/*.ts',
        'src/http/docs/**/*.ts',
      ];

  const options: swaggerJSDoc.Options = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Blog API',
        version: '1.0.0',
        description: 'Blog API descrição',
      },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    // aponte para os arquivos onde você colocará as anotações JSDoc @openapi
    apis: apiGlobs,
  };

  	const spec = swaggerJSDoc(options);

  	app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec, {
		swaggerOptions: { 
			persistAuthorization: true,
			// ordena as TAGS (grupos) em ordem alfabética
			tagsSorter: 'alpha',
			// ordena as operações por PATH e depois por método (GET, POST, PUT, PATCH, DELETE…)
			operationsSorter: (a: any, b: any) => {
				const byPath = a.get('path').localeCompare(b.get('path'));
				if (byPath !== 0) return byPath;
				const order = ['get','post','put','patch','delete','options','head','trace'];
				return order.indexOf(a.get('method')) - order.indexOf(b.get('method'));
			},
		},
  	}));

}
