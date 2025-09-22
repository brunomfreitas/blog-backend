// src/server.ts
import { env } from '@/env';
import { createApp } from './app';

createApp().then(app => {
  const port = Number(env.PORT ?? 3000);
  app.listen(port, () => console.log(`HTTP server on http://localhost:${port}`));
});
