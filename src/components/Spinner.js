import classes from "./Spinner.module.css";

export default function Spinner() {
    return (
        <div className={classes.container}>
            <div className={classes["lds-ring"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
