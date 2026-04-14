import Timer from "./Timer";
import Tasks from "./Tasks";
import './styles/Main.css';
import { useState } from "react";

interface Task {
  id:number;
  title:string;
}

export default function Main() {
    const [tasks, setTasks] = useState<Task[] | null>(null);

    return (
        <main>
            <Timer />
            <Tasks tasks={tasks} setTasks={setTasks} /> 
        </main>
    )
}