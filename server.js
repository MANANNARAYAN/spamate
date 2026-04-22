const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= DATABASE =================

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Connection Error:", err));

// ================= MODELS =================

const Customer = mongoose.model("Customer", {
  name: String
});

const Appointment = mongoose.model("Appointment", {
  customer: String,
  service: String,
  date: String
});

const Billing = mongoose.model("Billing", {
  customer: String,
  amount: Number
});

// ================= ROUTES =================

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// 👉 Customers
app.post("/api/customers", async (req, res) => {
  try {
    const data = await Customer.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/customers", async (req, res) => {
  try {
    const data = await Customer.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Appointments
app.post("/api/appointments", async (req, res) => {
  try {
    const data = await Appointment.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/appointments", async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Billing
app.post("/api/billing", async (req, res) => {
  try {
    const data = await Billing.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/billing", async (req, res) => {
  try {
    const data = await Billing.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});