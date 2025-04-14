import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext();


export function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/tasks")
            .then((res) => {
                console.log("Tasks ricevuti:", res.data);
                setTasks(res.data)
            })
            .catch((error) => {
                console.error("errore nel ricevere i dati", error)
            })
    }, []);

    return (
        <GlobalContext.Provider
            value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    )
};