import './styles/Tasks.css';

interface Task {
  id: number;
  title: string;
}

type TasksProps = {
    tasks: Task[] | null;
}

export default function Tasks({tasks}:TasksProps) {

    return (
        <section className="tasks">
            <div className="tasks-header">
                <h2>Suas Tarefas</h2>
            </div>
            <div className="tasks-container">
                <div className={`tasks-list ${tasks != null && "tasks-row"}`}>{tasks == null ? null : tasks.map(task => {

                    return (
                        <div className="task">
                            <button>{task.title}</button>
                        </div>
                    );
                })}
                    <div className="form">
                        <button className="open-form">+ Adicionar Tarefa</button>
                    </div>
                </div>
            </div>
        </section>
    );
}