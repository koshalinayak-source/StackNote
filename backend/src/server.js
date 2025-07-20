import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend port
    credentials: true,
  })
);

app.use("/api", rateLimiter); 


app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log("Server started on PORT :", PORT);
  });
})

