import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useState } from "react";
import * as Yup from "yup";
import TextField from "./TextField";
import { Formik, Form } from "formik";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Modal2 from "./Modal2";
import Modal from "./Modal";

export default function SignIn(props) {
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(AuthContext);

    async function loginHandler(loginData) {
        setIsLoading(true);
        const response = await fetch(
            "https://arcane-ocean-08535.herokuapp.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            }
        );
        setIsLoading(false);
        const data = await response.json();
        const data2 = { ...data, isLoggedIn: true };
        localStorage.setItem("userData", JSON.stringify(data2));
        context.setNewContext(data2);
    }

    const validate = Yup.object({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    if (isLoading) {
        return <Spinner></Spinner>;
    }
    return (
        <Modal s={{ padding: "0" }}>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={validate}
                onSubmit={values => {
                    loginHandler(values);
                }}
            >
                {formik => (
                    <Modal2>
                        <Form className={classes.form}>
                            <h1>Sign In</h1>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                            />
                            <button
                                className={classes["submit-btn"]}
                                type="submit"
                            >
                                Sign In
                            </button>
                            <Link className={classes.redirect} to="/signup">
                                Don't have an account? Sign up
                            </Link>
                        </Form>
                    </Modal2>
                )}
            </Formik>
        </Modal>
    );
}
