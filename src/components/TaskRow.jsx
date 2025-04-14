import React from "react";

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

function TaskRow({ task }) {
    return (
        <tr>
            <td>{task.title}</td>
            <td style={getStatusStyle(task.status)}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
}

export default React.memo(TaskRow);
