import dotenv from "dotenv";
import express from "express";
import { sql } from "./db.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

/**
 * Initialize and verify the database connection + schema.
 */
async function initDB() {
  try {
    // Verify connection first
    await sql`SELECT 1`;
    console.log("✅ Connected to the database successfully.");

    // Create the transactions table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log("🗄️  Database initialized successfully.");
  } catch (error) {
    console.error("❌ Error initializing database:", error.message);
    process.exit(1); // Exit to avoid running with a broken DB connection
  }
}

// middleware
app.use(express.json());

/**
 * Basic routes
 */

app.get("/", (res) => {
  res.send("Welcome to the FinanceHub API!");
});

app.get("/api/transactions/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC;
        `;
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const transaction = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *;
    `;
    return res.status(201).json(transaction[0]);
  } catch (error) {
    console.error("❌ Error creating transaction:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID." });
    }

    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    return res
      .status(200)
      .json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.log("❌ Error deleting transaction:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/api/transactions/summary/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${user_id};
    `;

    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${user_id} AND amount > 0
    `;

    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as expense FROM transactions WHERE user_id = ${user_id} AND amount < 0;
    `;
    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.log("❌ Error fetching summary:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

/**
 * Start server after DB is ready
 */
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
