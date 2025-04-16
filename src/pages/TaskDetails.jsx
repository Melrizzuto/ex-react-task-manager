import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

export default function TaskDetail() {
    const { id } = useParams()
    const { tasks } = useContext(GlobalContext)

    const task = tasks.find(t => t.id === parseInt(id))

    if (!task) {
        return (
            <h2>Task non trovata</h2>
        )
    }

    const handleRemove = () => {
        console.log("Eliminata task numero", task.id)
    }
    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p>Nome: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Stato: {task.status}</p>
            <p>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={handleRemove}>Elimina Task</button>
        </div>)
}