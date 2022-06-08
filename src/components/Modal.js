import classes from "./Modal.module.css";

export default function Modal({ children, s }) {
    return (
        <div className={classes.container} style={s}>
            {children}
        </div>
    );
}
