import { Router } from "express";
import { create } from "./create";
import { find } from "./find";
import { findAll } from "./find-all";
import { update } from "./update";

const categoryRoutes = Router();

categoryRoutes.post("/", create);
categoryRoutes.get('/', findAll)
categoryRoutes.get('/:id', find)
categoryRoutes.put('/', update)

export default categoryRoutes;
