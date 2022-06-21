import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import classes from "./Modal.module.css";

export default function Modal({ children, s }) {
    const { username } = useContext(AuthContext);
    return (
        <div className={classes.container} style={s}>
            {children}
            <h3 className={classes.name}>{`(${username})`}</h3>
        </div>
    );
}
