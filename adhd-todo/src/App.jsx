//Imports React hooks
import { useEffect,useState } from 'react';

import axios from "axios"; 
//imports axios so we can make requests to our backend

function App() { //creates a state variable called "tasks"
 //1. all state first
  const [tasks,setTasks] = useState([]);
  // stores your list of tasks
  //starts as an empty array []
  const [text,setText] = useState("");

  //2. effects next
  // runs when page first loads 
  useEffect(() => {
    axios 
    .get("http://localhost:3001/tasks") //sends a GET req to our backend
    .then((res) => setTasks(res.data)) // if req succeeds . res.data contains all tasks from mongodb
    .catch((err) => console.log(err)); // // catch if something breaks and print error on the console
    },[]); // this part mean like " run only once when page loads"

const addTask = () =>{
  axios
  .post("http://localhost:3001/tasks", {text})
  .then((res)=> {
    setTasks([...tasks,res.data]); // add new task to UI
    setText(""); // clear input
  })
  .catch((err) =>console.log(err));

};




    return(
      <div>
        <h1> ✨ Pixie Progress 🧚🏼‍♀️</h1> {/*my title of my project */}


<input placeholder="To Do..✨"/> {/*the writing inside the text box */}

<button onClick={addTask}>
  ADD {/* the button to post
   to, the next one or to create the next one */}
</button> 

        {/*Task list or/and loops through every task*/}
        {tasks.map((task) => ( //react give you one task at a time with this.
        <p key={task._id}> 
        {task.text}  {/*displays the task text */}
        </p>

        )
    )}
      </div>
   
    );
    
}
export default App;


