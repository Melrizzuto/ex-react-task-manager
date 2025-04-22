import axios from "axios";
import { useEffect, useState } from "react";

export function useTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/tasks")
            .then((res) => {
                console.log("Tasks ricevuti:", res.data);
                setTasks(res.data);
            })
            .catch((error) => {
                console.error("Errore nel ricevere i dati", error);
            });
    }, []);

    const addTask = async (newTask) => {
        console.log("Sto per inviare questo task:", newTask);
        const response = await axios.post("http://localhost:3001/tasks", newTask, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const { success, message, task } = response.data;
        if (!success) throw new Error(message);

        setTasks(prev => [...prev, task]);
    };

    const removeTask = async (taskId) => {
        const response = await axios.delete(`http://localhost:3001/tasks/${taskId}`);

        const { success, message } = response.data;
        if (!success) throw new Error(message);

        setTasks(prev => prev.filter(t => t.id !== taskId));
    };



    const updateTask = async (updatedTask) => {
        const { id, ...data } = updatedTask;

        const response = await axios.put(`http://localhost:3001/tasks/${id}`, data);

        const { success, message, task: newTask } = response.data;

        if (!success) throw new Error(message);

        setTasks(prev =>
            prev.map(oldTask => oldTask.id === newTask.id ? newTask : oldTask)
        );
    };


    return { tasks, addTask, removeTask, updateTask };
}
