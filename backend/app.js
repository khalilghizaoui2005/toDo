// importation
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/todoDB');

const app = express();


// make app
module.exports = app;

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model
const Todo = mongoose.model("Todo", new mongoose.Schema({
  title: String,
  completed: Boolean,
}));

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
