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
});

const User = mongoose.model("User", userSchema, "APIusers");


// Routes
app.post("/createUser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/", (req, res) => {
  res.send("from get route");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
