import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);
    const navigate = useNavigate();

    const task = tasks.find(t => t.id === parseInt(id));
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!task) {
        return <h2>Task non trovata</h2>;
    }

    const handleRemove = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminato correttamente");
            navigate("/");
        } catch (error) {
            console.error("errore nell'eliminazione task", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p>Nome: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Stato: {task.status}</p>
            <p>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>

            <Modal
                title="Conferma eliminazione"
                content={<p>Sei sicuro di voler eliminare questa task?</p>}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleRemove}
                confirmText="Elimina"
                show={showDeleteModal}
            />
        </div>
    );
}
