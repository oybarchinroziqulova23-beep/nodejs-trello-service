import express from "express";
import dotenv from "dotenv";
import MainRoutes from "./routes/main.routes.js";
import { errorHandler } from "./middleware/errorhandle.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", MainRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
