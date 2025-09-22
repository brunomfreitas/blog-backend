import { Router } from "express";
import { create } from "./create";
import { find } from "./find";
import { findAll } from "./find-all";
import { update } from "./update";

const userRoutes = Router();

userRoutes.post("/", create);
userRoutes.get('/', findAll)
userRoutes.get('/:id', find)
userRoutes.put('/', update)

export default userRoutes;
