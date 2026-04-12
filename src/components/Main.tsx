import Timer from "./Timer";
import Tasks from "./Tasks";
import './styles/Main.css';
import { useState } from "react";

interface Task {
  id:number;
  title:string;
}

export default function Main() {
    const [tasks, setTasks] = useState<Task[] | null>([{
        id: 1,
        title: "Criar site ecommerce"
    }, 
    {
        id: 2,
        title: "Criar jogo pateta assassino"
    },
    {
        id: 3,
        title: "Organizar planilha excel"
    },
    {
        id: 4,
        title: "Treinar poker"
    },{
        id: 5,
        title: "Treinar poker"
    },{
        id: 6,
        title: "Treinar poker"
    },{
        id: 7,
        title: "Treinar poker"
    },{
        id: 8,
        title: "Treinar poker"
    },{
        id: 9,
        title: "Treinar poker"
    },{
        id: 10,
        title: "Treinar poker"
    },]);

    return (
        <main>
            <Timer />
            <Tasks tasks={tasks} /> 
        </main>
    )
}