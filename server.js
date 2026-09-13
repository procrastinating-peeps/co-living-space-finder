require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");
const bookingRoutes = require("./routes/bookings");
const adminRoutes = require("./routes/admin");
const complaintRoutes = require("./routes/complaints");

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);

// Central error handler as a safety net for anything unexpected
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on our end." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Co-Living API running on http://localhost:${PORT}`);
});
