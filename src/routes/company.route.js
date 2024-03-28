import { Router } from "express";
const router = Router();

import { create, getAll, getById, updateById, deleteById } from "../controllers/company.controller.js";

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);
export default router;