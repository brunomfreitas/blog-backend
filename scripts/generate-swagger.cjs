const fs = require('fs');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'Blog API', version: '1.0.0', description: 'Blog API descrição' },
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    // PATHS perto das rotas
    'src/http/controllers/**/*.ts',
    // DOCS compartilhados (components/parameters/examples)
    'src/lib/swagger/docs/**/*.ts',
	//paths
	'src/lib/swagger/paths/**/*.ts',
  ],
};

const spec = swaggerJSDoc(options);

const outDir = path.join(process.cwd(), 'dist', 'swagger');
fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, 'openapi.json');
fs.writeFileSync(outFile, JSON.stringify(spec, null, 2));

console.log('[swagger] gerado em:', outFile);
console.log('[swagger] paths:', Object.keys(spec.paths || {}).length);
console.log('[swagger] schemas:', Object.keys(spec.components?.schemas || {}).length);
