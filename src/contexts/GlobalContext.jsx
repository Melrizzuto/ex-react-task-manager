import { createContext } from "react";
import { useTask } from "../hooks/useTask";

export const GlobalContext = createContext();


export function GlobalProvider({ children }) {
    const taskData = useTask();

    return (
        <GlobalContext.Provider
            value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    )
};