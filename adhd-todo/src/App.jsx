//Imports React hooks
import { useEffect,useState } from 'react';

import axios from "axios"; 
//imports axios so we can make requests to our backend

function App() { //creates a state variable called "tasks"
 
  const [tasks,setTasks] = useState([]);// stores all tasks from mongodb
 
  
  const [text,setText] = useState("");//stores what you type in the input box


  // runs when page first loads (Loads data on start)
  useEffect(() => {
    axios 
    .get("http://localhost:3001/tasks") //sends a GET req to our backend
    .then((res) => setTasks(res.data)) // if req succeeds . puts tasks into state so UI updates

    .catch((err) => console.log(err)); // // catch if something breaks and print error on the console
    },[]); // this part mean like " run only once when page loads"

    //sends new task to backend
const addTask = () => { 
  axios
  .post("http://localhost:3001/tasks", {text}) // whats user typed
  .then((res)=> {
    setTasks([...tasks,res.data]); // add new task to UI
    setText(""); // clear input box after adding
  })
  .catch((err) =>console.log(err));

};



// UI (WHAT PPL WILL SEE)
    return(
      <div>
        <h1> ✨ Pixie Progress 🧚🏼‍♀️</h1> {/*my title of my project */}


<input placeholder="To Do..✨"/> {/*the writing inside the text box */}
value={text} {/*connects input to state*/} 
onChange={(e) setText(e.target.vaule)} {/*updates state when typing*/}

<button onClick={addTask}>
  To Do.. {/* the button to post
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


