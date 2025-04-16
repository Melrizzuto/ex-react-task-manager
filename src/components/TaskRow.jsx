import { memo } from "react";
import { Link } from 'react-router-dom';

const getStatusStyle = (status) => {
    switch (status) {
        case "To do":
            return { backgroundColor: "lightcoral" };
        case "Doing":
            return { backgroundColor: "khaki" };
        case "Done":
            return { backgroundColor: "lightgreen" };
        default:
            return {};
    }
};

const TaskRow = memo(({ task }) => {
    return (
        <tr>
            <td>
                <Link to={`/task/${task.id}`}>{task.title}</Link>
            </td>
            <td style={getStatusStyle(task.status)}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
});

export default TaskRow;