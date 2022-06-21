import classes from "./Dialog.module.css";

export default function Dialog({ closeHandler, message }) {
    return (
        <div className={classes.container}>
            <div className={classes.dialog}>
                <div
                    className={classes["nav-hamburger-container"]}
                    onClick={closeHandler}
                >
                    <div className={classes["nav-toggle-lable"]}>
                        <span></span>
                    </div>
                </div>
                {message}
            </div>
        </div>
    );
}
