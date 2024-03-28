import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  findByDate,
  updateById,
  findByIdCompany
} from "../controllers/sell.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", findAll);
router.get("/bydate", findAll);
router.get("/:id", findByIdCompany);
router.post("/", create);
router.patch("/", updateById);

export default router;
