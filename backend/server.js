import dotenv from "dotenv";
import express from "express";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

app.get("/", (req, res) => {
  res.send("It's working!");
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
