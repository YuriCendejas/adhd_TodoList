import { useEffect,useState } from 'react';
//useState : stores data indside your UI 
import axios from "axios";

function App() {
  const [tasks,setTasks] = useState([]);
  // stores your list of tasks

  // runs when page first loads 
  useEffect(() => {
    axios 
    .get("http://localhost:3001/tasks")
    .then((res) => setTasks(res.data))
    .catch((err) => console.log(err));
    },[]);

    return(
      <h1>My Todo List </h1>
    )
}


