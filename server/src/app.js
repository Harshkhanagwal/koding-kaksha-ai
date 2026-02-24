const express = require("express");
const routes = require("./routes");
const authRoutes = require("./routes/auth.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");


const app = express();

app.use(
  cors({
    origin: process.env.CORS_URL || `http://localhost:5173/` ,
    credentials: true, 
  })
);

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
