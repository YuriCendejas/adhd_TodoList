const express = require("express"); //imports express
const mongoose = require("mongoose"); // import mongoose (tool thats of mongoDB)
const cors = require("cors"); // imports cors: lets your frontend talk to the backend
require("dotenv").config();

const app = express(); // not really for app of a phone but of ther server

app.use(cors());
//enables your react app to make requests to your server
app.use(express.json()); // allows server to read JSON data front frontend

//this part is to connect to the mongoDB
mongoose // starting point of the chain .
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.error(err));

//schema + model
const TaskSchema = new mongoose.Schema({
  // defines the shape of your data in your Database ( a "task")
  text: String, // tasks description
  completed: Boolean, // tells mongoose what kind of data this field is true and false
});
const Task = mongoose.model("Task", TaskSchema);
// creates a model ( what used to interact with the database)

//routes
app.get("/tasks", async (req, res) => {
  // when frontend says : " give me all tasks"
  const tasks = await Task.find(); // find all task in database
  res.json(tasks); // send them back to JSON to frontend
});

app.post("/tasks", async (req, res) => {

  // when frontend sends a new task
  const task = new Task({
    text: req.body.text,
    completed: false, // new tasks as not " completed yet"
  });
  await task.save(); // saves it into MongoDB
  res.json(task);
});

app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: true }, // // when frontend says :"mark this done"
    { new: true } // returns the updated version
  );
  res.json(task); // sends updated task back
});
// starts server 👩🏻‍💻
const PORT = process.env.PORT || 3001; // it just wasnting working with 5000 ,. CHATGPT SAID ❌ 5000 = unstable / taken by system
app.listen(PORT, () => {
  console.log(`Server running on  ${PORT}`);
}); /* this bc  then many hosting providers automatically assign a port number
and if its always uses 5000 then the deployment might fail bc it could be different */
