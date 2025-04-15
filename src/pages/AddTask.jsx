import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\"\\,.<>?/`~";

export default function AddTask() {
    const { addTask } = useContext(GlobalContext);
    const [title, setTitle] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();


    const titleError = useMemo(() => {
        if (!title.trim())
            return "Campo del nome del titolo non può essere vuoto";
        if ([...title].some(char => symbols.includes(char)))
            return "Caratteri task non validi, non può contenere simboli";
        return "";
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (titleError) return;

        const newTask = {
            title: title.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        };

        console.log("Sto per inviare questo task:", newTask);

        try {
            await addTask(newTask);
            alert("Task creata con successo!");
            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "todo";
        } catch (error) {
            console.error("Errore durante l'aggiunta del task:", error);
        }
    };

    return (
        <div className="add-task">
            <h2>Aggiungi un nuovo task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome del task:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {titleError && <p style={{ color: "red" }}>{titleError}</p>}
                </div>

                <div>
                    <label>Descrizione:</label>
                    <textarea ref={descriptionRef} />
                </div>

                <div>
                    <label>Status:</label>
                    <select ref={statusRef} defaultValue="To do">
                        {["To do", "Doing", "Done"].map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Aggiungi Task</button>
            </form>
        </div>
    );
}
