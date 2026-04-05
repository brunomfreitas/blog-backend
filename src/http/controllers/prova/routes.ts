import { requireAuth } from "@/http/middlewares/require-auth";
import { Router } from "express";
import { create } from "./create";
import { deleteProva } from "./delete";
import { find } from "./find";
import { list } from "./list";
import { update } from "./update";

const provaRoutes = Router();

provaRoutes.get('/', list)
provaRoutes.post('/', requireAuth, create);
provaRoutes.put('/:id', requireAuth, update)
provaRoutes.delete('/:id', requireAuth, deleteProva)
provaRoutes.get('/:id', find)

export default provaRoutes;