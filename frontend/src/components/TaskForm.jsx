import { useState } from "react";
import { createTask } from "../services/taskService";

export default function TaskForm() {
    const [task, setTask] = useState({
       title: "",
       description: "",
       user: {
           id: ""
       }
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "userId") setTask({...task, user: {id: value}});
        else setTask({...task, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const createdTask = await createTask(task);
            alert(`Tarea creada con ID: ${createdTask.id}`);
            setTask({
                title: "",
                description: "",
                user: {
                    id: ""
                }
            });
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título:</label>
                <input name='title' value={task.title} onChange={handleChange} />
                {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
            </div>
            <div>
                <label>Descripción:</label>
                <input name='description' value={task.description} onChange={handleChange} />
                {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
            </div>
            <div>
                <label>ID Usuario:</label>
                <input name='userId' value={task.user.id} onChange={handleChange} />
                {errors.user && <span style={{ color: "red" }}>{errors.user}</span>}
            </div>
            <button type='submit'>Crear Tarea</button>
        </form>
    );
}