import { Router } from "express";
import { create } from "./create";
import { find } from "./find";
import { findAll } from "./find-all";
import { update } from "./update";

const personRoutes = Router();

personRoutes.post("/", create);
personRoutes.get('/', findAll)
personRoutes.get('/:id', find)
personRoutes.put('/', update)

export default personRoutes;
