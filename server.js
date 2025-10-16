import express from "express"
import dotenv from "dotenv"
import MainRoutes from "./src/routes/main.routes.js"
import { errorHandler } from "./src/middleware/errorhandle.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use("/api", MainRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

import  pool  from "./src/config/db.js";

(async () => {
  const res = await pool.query("SELECT current_database()");
  console.log("Ulangan baza:", res.rows[0].current_database);
})();
