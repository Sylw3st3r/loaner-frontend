import Modal2 from "./Modal2";
import classes from "./Home.module.css";
import Modal from "./Modal";

export default function Home() {
    return (
        <Modal>
            <Modal2>
                <div className={classes.box}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                </div>
            </Modal2>
        </Modal>
    );
}
