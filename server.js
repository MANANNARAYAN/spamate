const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB connection
// 🔹 MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// 🔹 Extra connection logs (ADD THIS BELOW)
mongoose.connection.on("connected", () => {
  console.log("🔥 DB Connected Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("❌ DB Connection Error:", err);
});

// 🔹 Models
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

// ================= APIs =================

// 👉 Customers
app.post("/api/customers", async (req, res) => {
  const data = await Customer.create(req.body);
  res.json(data);
});

app.get("/api/customers", async (req, res) => {
  const data = await Customer.find();
  res.json(data);
});

// 👉 Appointments
app.post("/api/appointments", async (req, res) => {
  const data = await Appointment.create(req.body);
  res.json(data);
});

app.get("/api/appointments", async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
});

// 👉 Billing
app.post("/api/billing", async (req, res) => {
  const data = await Billing.create(req.body);
  res.json(data);
});

app.get("/api/billing", async (req, res) => {
  const data = await Billing.find();
  res.json(data);
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));