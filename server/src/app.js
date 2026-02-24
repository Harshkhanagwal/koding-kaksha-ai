const express = require("express");
const routes = require("./routes");
const authRoutes = require("./routes/auth.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");


const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || process.env.CORS_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isOriginAllowed = (requestOrigin) => {
  if (!requestOrigin) return true;
  if (!allowedOrigins.length) return true;

  return allowedOrigins.some((allowedOrigin) => {
    if (allowedOrigin.includes("*")) {
      const pattern = new RegExp(
        `^${allowedOrigin.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\\\*/g, ".*")}$`
      );
      return pattern.test(requestOrigin);
    }

    return allowedOrigin === requestOrigin;
  });
};

const corsOptions = {
  origin: (requestOrigin, callback) => {
    if (isOriginAllowed(requestOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${requestOrigin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to KodingKasha API",
  });
});

app.use("/api", routes);
app.use("/auth", authRoutes);

// app.use(notFound);
// app.use(errorHandler);

module.exports = app;
