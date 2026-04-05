import { requireAuth } from "@/http/middlewares/require-auth";
import { Router } from "express";
import { create } from "./create";
import { deleteAlternativa } from "./delete";
import { find } from "./find";
import { list } from "./list";
import { listAll } from "./list-all";
import { search } from "./search";
import { update } from "./update";

const alternativasRoutes = Router();

alternativasRoutes.get('/search', search)
alternativasRoutes.get('/', list)
alternativasRoutes.get('/all', requireAuth, listAll);
alternativasRoutes.post('/', requireAuth, create);
alternativasRoutes.put('/:id', requireAuth, update)
alternativasRoutes.delete('/:id', requireAuth, deleteAlternativa)
alternativasRoutes.get('/:id', find)

export default alternativasRoutes;