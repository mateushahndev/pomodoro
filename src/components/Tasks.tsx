import { useState, useRef, useEffect } from 'react';
import './styles/Tasks.css';
import Popup from 'reactjs-popup';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type TasksProps = {
    tasks: Task[] | null;
    setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
}

export default function Tasks({tasks, setTasks}: TasksProps) {
    const [task, setTask] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setTask(e.target.value);
    }

    function handleSave(close: Function): void {
        if (task.trim() === '') return;

        setTasks((prev: Task[] | null) => {
            const newTask: Task = {
                id: Date.now(),
                title: task,
                completed: false
            };
            return prev ? [...prev, newTask] : [newTask];
        });

        setTask(''); 
        close();
    }

    function handleInputKeyDown(e: React.KeyboardEvent, close: Function) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave(close);
        }
    }

    function toggleTask(id: number) {
        setTasks((prev) => 
            prev ? prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t) : null
        );
    }

    function deleteTask(id: number) {
        setTasks((prev) => 
            prev ? prev.filter(t => t.id !== id) : null
        );
    }

    return (
        <section className="tasks">
            <div className="tasks-header">
                <h2>Suas Tarefas</h2>
            </div>
            
            <div className="tasks-container">
                <div className="tasks-list">
                    {/* Lista de Tarefas Renderizada */}
                    {tasks == null ? null : tasks.map(t => (
                        <div key={t.id} className={`task-card ${t.completed ? 'completed' : ''}`}>
                            <button className="btn-check" onClick={() => toggleTask(t.id)}>
                                {t.completed ? (
                                    <CheckCircle2 size={22} color="#48bb78" /> 
                                ) : (
                                    <Circle size={22} color="#718096" />
                                )}
                            </button>

                            <span className="task-title">{t.title}</span>

                            <button className="btn-delete" onClick={() => deleteTask(t.id)}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    <div className="form">
                        <Popup
                            trigger={<button className="open-form">+ Adicionar Tarefa</button>}
                            modal
                            nested
                            onOpen={() => {
                                setTimeout(() => inputRef.current?.focus(), 10);
                            }}
                        >
                            {((close: () => void) => {
                                useEffect(() => {
                                    inputRef.current?.focus();
                                }, []);

                                return (
                                    <div className="modal-container">
                                        <div className="modal-header">
                                            <h2>Adicione uma tarefa</h2>
                                            <button className="close-btn" onClick={close}>&times;</button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="input-group">
                                                <label htmlFor="task-title">Título da tarefa</label>
                                                <input 
                                                    ref={inputRef}
                                                    id="task-title"
                                                    type="text" 
                                                    placeholder="O que você vai focar agora?" 
                                                    className="task-input"
                                                    value={task}
                                                    onChange={handleChange}
                                                    onKeyDown={(e) => handleInputKeyDown(e, close)}
                                                />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="confirm-btn" onClick={() => handleSave(close)}>
                                                Salvar Tarefa
                                            </button>
                                        </div>
                                    </div>
                                );
                            }) as any}
                        </Popup>
                    </div>
                </div>
            </div>
        </section>
    );
}