const express = require("express");
const dotenv = require("dotenv");
const { validateEnv } = require("./config/env");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
validateEnv();

const app = express();

app.use(express.json({ limit: "100kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});
app.get("/", (req, res) => {
  res.send("AstroJanani Backend is Live 🚀");
});
const prisma = require("./config/prisma");

app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
