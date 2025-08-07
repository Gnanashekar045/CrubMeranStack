const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // <--- Needed to parse JSON bodies

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/crud_db')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
},{timestamps: true});

const Customer = mongoose.model("Customer", userSchema, "APIusers");



// Routes
app.post("/createUser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new Customer(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/readAllUser", async (req, res) => {
  try {
    const userdatax = await Customer.find({})
    res.send(userdatax)
  } catch (error) {
    res.send(error)
  }
})

app.get("/readUser/:id", async(req, res) => {
  try {
    const id = req.params.id
    const user = await Customer.findById({_id: id});
    res.send(user)
  } catch (error) {
    res.send(error)
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Customer.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Customer.findByIdAndDelete({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
