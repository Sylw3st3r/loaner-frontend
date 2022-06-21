import { useContext, useState } from "react";
import * as Yup from "yup";
import TextField from "./TextField";
import { Formik, Form } from "formik";
import classes from "./SignUp.module.css";
import Spinner from "./Spinner";
import Modal from "./Modal";
import { AuthContext } from "../context/auth-context";
import Modal2 from "./Modal2";
import Dialog from "./Dialog";

export default function AddLoan() {
    const [isLoading, setIsLoading] = useState(false);
    const { token, email } = useContext(AuthContext);
    const [dialogState, setDialogState] = useState(null);

    async function addLoanHandler(loanData) {
        setIsLoading(true);
        try {
            await fetch("https://arcane-ocean-08535.herokuapp.com/loans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...loanData, creatorLogin: email }),
            });
            setDialogState("Loan offer has been created");
        } catch (error) {
            setDialogState("Something went wrong");
        }
        setIsLoading(false);
    }

    const validate = Yup.object({
        name: Yup.string().required("Name required"),
        description: Yup.string().required("Description required"),
        interestRate: Yup.number()
            .positive("Total ammount cant be negative")
            .required("Interest Rate required"),
        sum: Yup.number()
            .positive("Total ammount cant be negative")
            .required("Total ammount required"),
    });

    if (isLoading) {
        return <Spinner></Spinner>;
    }
    return (
        <Modal>
            {dialogState && (
                <Dialog
                    message={dialogState}
                    closeHandler={setDialogState.bind(null, null)}
                ></Dialog>
            )}
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    interestRate: 0,
                    sum: 0,
                }}
                validationSchema={validate}
                onSubmit={values => {
                    addLoanHandler(values);
                }}
            >
                {formik => (
                    <Modal2>
                        <Form className={classes.form}>
                            <h1>Add new loan</h1>
                            <TextField label="Name" name="name" type="text" />
                            <TextField
                                label="Description"
                                name="description"
                                type="text"
                            />
                            <TextField
                                label="Interest Rate"
                                name="interestRate"
                                type="number"
                            />
                            <TextField
                                label="Total Ammount"
                                name="sum"
                                type="number"
                            />
                            <button
                                className={classes["submit-btn"]}
                                type="submit"
                            >
                                Add
                            </button>
                        </Form>
                    </Modal2>
                )}
            </Formik>
        </Modal>
    );
}
