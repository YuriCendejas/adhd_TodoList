const express = require("express"); //imports express
const mongoose = require("mongoose"); // import mongoose (tool thats of mongoDB)
const cors = require("cors"); // imports cors: lets your frontend talk to the backend
require("dotenv").config();


const app =express(); // not really for app of a phone but of ther server

app.use(cors());
//enables your react app to make requests to your server
app.use(express.json());// allows server to read JSON data front frontend

//this part is to connect to the mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to mongoDB"))
.catch( err => console.error(err));

//schema + model
const TaskSchema = new mongoose.Schema({
    text:String,
    completed:Boolean // tells mongoose what kind of data this field is true and false
});
const Task = mongoose.model("Task",TaskSchema);

//routes
app.get("/tasks",async(req,res) => {
    const tasks = await Task.find();
    res.json(tasks);

});

app.post("/tasks",async(req,res) => {
    const task = new Task ({
        text:req.body.text,
        completed:false
 });
    await task.save();
    res.json(task);
});

app.put("/tasks/:id",async(req,res) => {
    const task = await Task.findByIdAndUpdate(req.params.id,
        {completed:true},
        {new:true} // since bow its updated
);
res.json(task);
})
// starts server 👩🏻‍💻
app.listen(5000,() => console.log("Server running on port 5000"));