import classes from "./Navbar.module.css";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const Admin = "ROLE_ADMIN";

const routes = [
    { to: "/users", name: "Users", icon: "group" },
    { to: "/home", name: "Home", icon: "home" },
    { to: "/addloan", name: "Add Loan", icon: "add" },
    { to: "/myloans", name: "My Loans", icon: "view_list" },
    { to: "/loans", name: "Loans", icon: "list" },
    { to: "/apply", name: "Apply", icon: "send" },
    { to: "/applications/lender", name: "Applications", icon: "perm_identity" },
    {
        to: "/applications/loans",
        name: "Loan Applications",
        icon: "perm_identity",
    },
];

export default function Navbar() {
    const { logout } = useContext(AuthContext);

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
                            return !!route;
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
