import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  updateById,
  findByIdCompany,
  deleteById
} from "../controllers/stock.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", findAll);
router.get("/:id", findByIdCompany);
router.post("/", create);
router.patch("/", updateById);
router.delete("/:id", deleteById);

export default router;
