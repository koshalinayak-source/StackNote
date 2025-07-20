import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();

console.log("🔍 Redis URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("🔍 Redis Token:", process.env.UPSTASH_REDIS_REST_TOKEN);

//middleware :
app.use(express.json()); // this middleware will parse JSON bodies : req.body

app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//   })
// );

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // or your frontend port
      credentials: true,
    })
  );
}

app.use("/api", rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT :", PORT);
  });
});
