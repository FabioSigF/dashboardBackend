import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  updateById,
  findByIdCompany,
  deleteById,
  findByAmount
} from "../controllers/stock.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", findAll);
router.get("/:id", findByIdCompany);
router.get("/amount/:amount", findByAmount);
router.get("/amount/:amount/id/:id", findByAmount);
router.post("/", create);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export default router;
