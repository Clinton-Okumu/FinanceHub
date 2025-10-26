import express from "express";
import {
  createTransactions,
  getTransactionsByUserId,
  getTransactionsSummaryByUserId,
  deleteTransactionsById,
} from "../controllers/transactionControllers.js";

const router = express.Router();

/**
 * Basic routes
 */

router.get("/:user_id", getTransactionsByUserId);

router.post("", createTransactions);

router.delete("/:id", deleteTransactionsById);

router.get("/summary/:user_id", getTransactionsSummaryByUserId);

export default router;
