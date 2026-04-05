import { Router } from 'express';
import { finish } from './finish';
import { start } from './start';

const provaAlunoRoutes = Router();

provaAlunoRoutes.post('/start', start);
provaAlunoRoutes.post('/finish', finish);

export default provaAlunoRoutes;