require("dotenv").config();
const express = require("express");
const initializeDatabase = require("./src/config/initDB");

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

app.use((_, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
