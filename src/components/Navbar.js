import classes from "./Navbar.module.css";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const routes = [
    {
        to: "/home",
        name: "Home",
        icon: "home",
        access: ["ROLE_ADMIN", "ROLE_USER", "ROLE_LENDER"],
    },
    { to: "/users", name: "Users", icon: "group", access: ["ROLE_ADMIN"] },
    { to: "/addloan", name: "Add Loan", icon: "add", access: ["ROLE_LENDER"] },
    {
        to: "/myloans",
        name: "My Loans",
        icon: "view_list",
        access: ["ROLE_LENDER"],
    },
    { to: "/loans", name: "Loans", icon: "list", access: ["ROLE_USER"] },
    { to: "/apply", name: "Apply", icon: "send", access: ["ROLE_USER"] },
    {
        to: "/applications/lender",
        name: "Applications",
        icon: "perm_identity",
        access: ["ROLE_ADMIN"],
    },
    {
        to: "/applications/loans",
        name: "Loan Applications",
        icon: "list",
        access: ["ROLE_LENDER"],
    },
];

export default function Navbar() {
    const { logout, roles } = useContext(AuthContext);

    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>Lender Basket</h1>
            <input
                type="checkbox"
                id="nav-toggle"
                className={classes["nav-toggle"]}
            ></input>
            <nav className={classes.navbar}>
                <ul>
                    {routes
                        .filter(route => {
                            return route.access.includes(roles[0]);
                        })
                        .map((route, index) => (
                            <li key={index}>
                                <NavLink to={route.to}>
                                    <span
                                        className="material-icons MuiIcon-root"
                                        aria-hidden="true"
                                    >
                                        {route.icon}
                                    </span>
                                    {route.name}
                                </NavLink>
                            </li>
                        ))}
                    <li>
                        <a href="#" onClick={logout}>
                            <span
                                className="material-icons MuiIcon-root"
                                aria-hidden="true"
                            >
                                logout
                            </span>
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={classes["nav-hamburger-container"]}>
                <label
                    htmlFor="nav-toggle"
                    className={classes["nav-toggle-lable"]}
                >
                    <span></span>
                </label>
            </div>
        </header>
    );
}
