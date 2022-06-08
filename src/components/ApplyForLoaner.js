import { useContext, useState } from "react";
import * as Yup from "yup";
import TextField from "./TextField";
import { Formik, Form } from "formik";
import classes from "./SignUp.module.css";
import Spinner from "./Spinner";
import Modal from "./Modal";
import { AuthContext } from "../context/auth-context";
import Modal2 from "./Modal2";

export default function ApplyForLoaner() {
    const [isLoading, setIsLoading] = useState(false);
    const { token, email } = useContext(AuthContext);

    async function addApplication(applicationData) {
        setIsLoading(true);
        try {
            await fetch(
                "https://arcane-ocean-08535.herokuapp.com/application/lenders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: applicationData.name,
                        description: applicationData.description,
                        userEmail: email,
                    }),
                }
            );
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const validate = Yup.object({
        name: Yup.string().required("Name required"),
        description: Yup.string().required("Description required"),
    });

    if (isLoading) {
        return <Spinner></Spinner>;
    }
    return (
        <Modal>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                }}
                validationSchema={validate}
                onSubmit={values => {
                    addApplication(values);
                }}
            >
                {formik => (
                    <Modal2>
                        <Form className={classes.form}>
                            <h1>Apply for Loaner Position</h1>
                            <TextField label="Name" name="name" type="text" />
                            <TextField
                                label="Description"
                                name="description"
                                type="text"
                            />
                            <button
                                className={classes["submit-btn"]}
                                type="submit"
                            >
                                Apply
                            </button>
                        </Form>
                    </Modal2>
                )}
            </Formik>
        </Modal>
    );
}
