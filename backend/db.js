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
