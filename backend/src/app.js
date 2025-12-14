const express = require("express");
const cors = require("cors");

const app = express();

// ✅ ENABLE CORS
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const sweetRoutes = require("./routes/sweetRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/", (req, res) => {
  res.send("Sweet Shop API running");
});

module.exports = app;
