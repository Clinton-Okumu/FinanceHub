import dotenv from "dotenv";
import express from "express";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

// middleware
app.use(rateLimiter);
app.use(express.json());

//routing
app.get('/api', (req, res) => {
  res.send("Welcome to the FinanceHub API!");
});

app.use("/api/transactions", transactionRoutes);

/**
 * Start server after DB is ready
 */
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
