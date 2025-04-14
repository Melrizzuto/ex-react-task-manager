import { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";

export default function AddTask() {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("To do"); // stato iniziale
    const { tasks, setTasks } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            title,
            status,
            createdAt: new Date().toISOString() // opzionale
        };

        axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask)
            .then((res) => {
                setTasks([...tasks, res.data]);
                setTitle("");
                setStatus("To do");
            })
            .catch((err) => {
                console.error("Errore durante l'aggiunta del task:", err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Aggiungi un nuovo Task</h2>

            <label>
                Titolo:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>

            <label>
                Stato:
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="To do">Da fare</option>
                    <option value="Doing">In corso</option>
                    <option value="Done">Fatto</option>
                </select>
            </label>

            <button type="submit">Aggiungi</button>
        </form>
    );
}
