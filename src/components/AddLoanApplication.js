import { useContext, useState } from "react";
import * as Yup from "yup";
import TextField from "./TextField";
import { Formik, Form } from "formik";
import classes from "./SignUp.module.css";
import Spinner from "./Spinner";
import { AuthContext } from "../context/auth-context";
import classes2 from "./AddLoanApplication.module.css";

export default function AddLoanApplication({ closeHandler, requestBody }) {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useContext(AuthContext);

    async function addLoanHandler(loanData) {
        setIsLoading(true);
        try {
            await fetch(
                "https://arcane-ocean-08535.herokuapp.com/application/loans",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(loanData),
                }
            );
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
        closeHandler(null);
    }

    const clickHandler = () => {
        closeHandler(null);
    };

    const validate = Yup.object({
        name: Yup.string().required("Name required"),
        description: Yup.string().required("Description required"),
    });

    if (isLoading) {
        return (
            <div className={classes2.container}>
                <div className={classes2["lds-ring"]}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
            }}
            validationSchema={validate}
            onSubmit={values => {
                addLoanHandler({ ...values, ...requestBody });
            }}
        >
            {formik => (
                <div className={classes2.container}>
                    {" "}
                    <Form className={classes.form}>
                        <h1>Apply for Loan</h1>
                        <TextField label="Name" name="name" type="text" />
                        <TextField
                            label="Description"
                            name="description"
                            type="text"
                        />
                        <div className={classes2.buttons}>
                            <button
                                className={classes["submit-btn"]}
                                type="submit"
                            >
                                Apply
                            </button>
                            <button
                                className={classes2["close-btn"]}
                                type="button"
                                onClick={clickHandler}
                            >
                                Close
                            </button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}
