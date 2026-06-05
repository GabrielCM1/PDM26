import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoriesRoutes from "./routes/categories.js";
import transactionsRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "gestao-financeira-api",
  });
});

app.use("/categories", categoriesRoutes);
app.use("/transactions", transactionsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});