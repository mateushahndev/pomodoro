import Timer from "./Timer";
import Tasks from "./Tasks";
import './styles/Main.css';
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Main() {

    const [tasks, setTasks] = useState<Task[] | null>(() => {
        const savedTasks = localStorage.getItem("my-tasks");
        return savedTasks ? JSON.parse(savedTasks) : null;
    });

    useEffect(() => {
        if (tasks !== null) {
            localStorage.setItem("my-tasks", JSON.stringify(tasks));
        } else {
            localStorage.removeItem("my-tasks");
        }
    }, [tasks]);

    return (
        <main>
            <Timer />
            <Tasks tasks={tasks} setTasks={setTasks} /> 
        </main>
    )
}