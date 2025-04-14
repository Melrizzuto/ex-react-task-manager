import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <NavLink
                to="/"
            >
                Lista Task
            </NavLink>

            <NavLink
                to="/add"
            >
                Aggiungi Task
            </NavLink>
        </nav>
    );
}
