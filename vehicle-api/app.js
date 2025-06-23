const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/vehicleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Mongoose schema & model
const vehicleSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  desc: String,
  brand: String
});
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES

// GET all vehicles
app.get("/", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render("index", { vehicles });
});

// Form to create new vehicle
app.get("/vehicles/new", (req, res) => {
  res.render("new");
});

// POST create new vehicle
app.post("/vehicles", async (req, res) => {
  const { name, price, image, desc, brand } = req.body;
  await Vehicle.create({ name, price, image, desc, brand });
  res.redirect("/");
});

// GET edit form
app.get("/vehicles/:id/edit", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render("edit", { vehicle });
});

// POST update vehicle
app.post("/vehicles/:id", async (req, res) => {
  const { name, price, image, desc, brand } = req.body;
  await Vehicle.findByIdAndUpdate(req.params.id, { name, price, image, desc, brand });
  res.redirect("/");
});

// DELETE vehicle
app.post("/vehicles/:id/delete", async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
