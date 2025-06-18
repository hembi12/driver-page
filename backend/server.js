import express from "express";
import cors from "cors";
import emailRouter from "./routes/email.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", emailRouter);

app.listen(3001, () => {
  console.log("🚀 Servidor backend corriendo en http://localhost:3001");
});