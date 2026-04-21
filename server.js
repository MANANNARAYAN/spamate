const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const Customer = require('./models/Customer');
const Appointment = require('./models/Appointment');
const Billing = require('./models/Billing');
const User = require('./models/User');

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/spamate')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// test route
app.get('/', (req, res) => {
    res.send("SpaMate Backend Running");
});
app.post('/addCustomer', async (req, res) => {
    const customer = new Customer(req.body);
    await customer.save();
    res.send(customer);
});
app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});
app.post('/book', async (req, res) => {
    const appt = new Appointment(req.body);
    await appt.save();
    res.send(appt);
});
app.post('/bill', async (req, res) => {
    const bill = new Billing(req.body);
    await bill.save();
    res.send(bill);
});
app.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
        res.send({ message: "Login success", user });
    } else {
        res.send({ message: "Invalid credentials" });
    }
});
app.get('/appointments', async (req, res) => {
    const data = await Appointment.find();
    res.send(data);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});