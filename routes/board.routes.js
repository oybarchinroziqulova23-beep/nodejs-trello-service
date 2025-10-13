import express from "express";
import boardController from "../controllers/board.controller.js";
import { authenticateToken } from "../middleware/auth.js";
import { validate } from "../middleware/validation.js";
import { boardValidation } from "../validation/board.validation.js";

const router = express.Router();
router.post("/", authenticateToken, validate(boardValidation), boardController.create);
router.get("/", authenticateToken, boardController.getAll);
router.get("/:id", authenticateToken, boardController.getById);
router.put("/:id", authenticateToken, validate(boardValidation), boardController.update);
router.delete("/:id", authenticateToken, boardController.remove);

export default router;
