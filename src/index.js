const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const { validateEnv } = require("./config/env");
const authRoutes = require("./routes/authRoutes");
const horoscopeRoutes = require("./routes/horoscopeRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
validateEnv();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  })
);
app.use(helmet());
app.use(express.json({ limit: "100kb" }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(["/register", "/login"], authLimiter);

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

app.use(authRoutes);
app.use(horoscopeRoutes);

app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
