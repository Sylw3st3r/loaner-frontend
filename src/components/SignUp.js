import React from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import classes from "./SignUp.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "./Spinner";
import Modal2 from "./Modal2";
import Modal from "./Modal";

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);

    async function signUpHandler(signUpData) {
        setIsLoading(true);
        try {
            await fetch("https://arcane-ocean-08535.herokuapp.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signUpData),
            });
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const validate = Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        age: Yup.number()
            .required("Age required")
            .min(18, "You have to be at least 18 years old"),
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
        password: Yup.string()
            .min(5, "Password must be at least 5 charaters long")
            .required("Password is required"),
        matchingPassword: Yup.string()
            .min(5, "Password must be at least 5 charaters long")
            .oneOf([Yup.ref("password"), null], "Password must match")
            .required("Confirm your password"),
    });

    if (isLoading) {
        return <Spinner></Spinner>;
    }
    return (
        <Modal s={{ padding: "0" }}>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    age: 0,
                    email: "",
                    password: "",
                    matchingPassword: "",
                }}
                validationSchema={validate}
                onSubmit={values => {
                    signUpHandler(values);
                }}
            >
                {formik => (
                    <Modal2>
                        <Form className={classes.form}>
                            <h1>Sign Up</h1>
                            <TextField
                                label="First Name"
                                name="firstName"
                                type="text"
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                type="text"
                            />
                            <TextField label="Age" name="age" type="number" />
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
                            <TextField
                                label="Matching Password"
                                name="matchingPassword"
                                type="password"
                            />
                            <button
                                className={classes["submit-btn"]}
                                type="submit"
                            >
                                Sign Up
                            </button>
                            <Link className={classes.redirect} to="/signin">
                                You already have an account? Sign in
                            </Link>
                        </Form>
                    </Modal2>
                )}
            </Formik>
        </Modal>
    );
}
