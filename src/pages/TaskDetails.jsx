import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    const navigate = useNavigate();

    const task = tasks.find(t => t.id === parseInt(id));
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const handleUpdate = async updatedTask => {
        try {
            await updateTask(updatedTask);
            setShowEditModal(false)

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div className="task-detail">
            <h1>Dettaglio Task</h1>
            <p><strong>Nome:</strong> {task.title}</p>
            <p><strong>Descrizione:</strong> {task.description || "—"}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={() => setShowDeleteModal(true)}>Elimina</button>
            <button onClick={() => setShowEditModal(true)}>Modifica</button>

            <Modal
                title="Conferma eliminazione"
                content={<p>Sei sicuro di voler eliminare questa task?</p>}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleRemove}
                confirmText="Elimina"
                show={showDeleteModal}
            />

            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    );
}
