import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// Ensure we have a database URL
if (!process.env.DATABASE_URL) {
  console.error("❌ Missing DATABASE_URL in environment variables.");
  process.exit(1);
}

// Create a SQL client using Neon
export const sql = neon(process.env.DATABASE_URL);

/**
 * Initialize and verify the database connection + schema.
 */
export async function initDB() {
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
