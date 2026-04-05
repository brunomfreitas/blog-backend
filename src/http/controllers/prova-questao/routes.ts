import { Router } from 'express';
import { create } from './create';
import { deleteByProva } from './delete-by-prova';
import { listByProva } from './list-by-prova';

const provaQuestaoRoutes = Router();

provaQuestaoRoutes.post('/create', create);
provaQuestaoRoutes.get('/:provaId', listByProva);
provaQuestaoRoutes.delete('/:provaId', deleteByProva);

export default provaQuestaoRoutes;