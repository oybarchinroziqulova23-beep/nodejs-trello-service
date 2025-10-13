import express from "express";
import userController from "../controllers/user.controller.js";
import { validate } from "../middleware/validation.js";
import { userValidation } from "../validation/user.validation.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", validate(userValidation), userController.create);
router.get("/", authenticateToken, userController.getAll);
router.get("/:id", authenticateToken, userController.getById);
router.put("/:id", authenticateToken, validate(userValidation), userController.update);
router.delete("/:id", authenticateToken, userController.remove);

export default router;
