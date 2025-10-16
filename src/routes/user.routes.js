import express from "express";
import { validate } from "../middleware/validation.js";
import { userValidation } from "../validation/user.validation.js";
import { authenticateToken } from "../middleware/auth.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", validate(userValidation), (req, res) => userController.create(req, res));
router.get("/", authenticateToken, (req, res) => userController.getAll(req, res));
router.get("/search", authenticateToken, (req, res) => userController.search(req, res));
router.get("/:id", authenticateToken, (req, res) => userController.getById(req, res));
router.put("/:id", authenticateToken, validate(userValidation), (req, res) => userController.update(req, res));
router.delete("/:id", authenticateToken, (req, res) => userController.remove(req, res));

export default router;
