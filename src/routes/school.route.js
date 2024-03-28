import { Router } from "express";
const router = Router();

import { create, getAll, getById, updateById, deleteById } from "../controllers/school.controller.js";

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export default router;