import { Router } from "express";
import { create } from "./create";
import { find } from "./find";
import { findAll } from "./find-all";
import { update } from "./update";

const postStatusRoutes = Router();

postStatusRoutes.post("/", create);
postStatusRoutes.get('/', findAll)
postStatusRoutes.get('/:id', find)
postStatusRoutes.put('/', update)

export default postStatusRoutes;
