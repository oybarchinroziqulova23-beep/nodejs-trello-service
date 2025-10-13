import express from "express";
import userRoutes from "./board.routes.js";
import taskRoutes from "./tasks.routes.js";
import boardRoutes from "./user.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/boards", boardRoutes);

export default router;
