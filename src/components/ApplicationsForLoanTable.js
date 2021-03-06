import MaterialTable from "material-table";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Modal from "./Modal";

const getLoans = async (token, id) => {
    const response = await fetch(
        `https://arcane-ocean-08535.herokuapp.com/application/loans`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    console.log(data);
    return data.filter(loan => id === loan.applicationReceiver.id);
};

const confirmApplications = async (token, id) => {
    await fetch(
        `https://arcane-ocean-08535.herokuapp.com/application/loans/${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                accepted: true,
                applicationId: id,
                message: "string",
            }),
        }
    );
    return;
};

export default function ApplicationsForLoanTable() {
    const [usersData, setUsersData] = useState([]);
    const [trigger, setTrigger] = useState(true);
    const { token, id } = useContext(AuthContext);

    useEffect(() => {
        (async function () {
            const data = await getLoans(token, id);

            const d = data.map(application => {
                const { accepted, applicationCreator, loanEntity, ...rest } =
                    application;
                const interestRate = loanEntity.interestRate;
                const sum = loanEntity.sum;
                const nameC = `${applicationCreator.firstName} ${applicationCreator.lastName}`;
                const email = applicationCreator.email;

                console.log(interestRate, sum, nameC, email);

                return {
                    ...rest,
                    accepted: accepted ? "True" : "False",
                    interestRate: interestRate,
                    sum: sum,
                    nameC: nameC,
                    email: email,
                };
            });

            setUsersData(d);
        })();
    }, [token, id, trigger]);

    const columns = [
        {
            title: "Id",
            field: "id",
        },
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Description",
            field: "description",
        },
        {
            title: "Application Creator",
            field: "nameC",
        },
        {
            title: "Email",
            field: "email",
        },
        {
            title: "Sum",
            field: "sum",
        },
        {
            title: "Interest Rate",
            field: "interestRate",
        },
        {
            title: "Accepted",
            field: "accepted",
        },
    ];

    return (
        <Fragment>
            <Modal>
                <MaterialTable
                    title="Applications For Loan"
                    actions={[
                        {
                            icon: "check",
                            tooltip: "Accept",
                            onClick: (event, rowData) => {
                                (async function () {
                                    try {
                                        await confirmApplications(
                                            token,
                                            rowData.id
                                        );
                                        setTrigger(!trigger);
                                    } catch (err) {
                                        console.log(err);
                                    }
                                })();
                            },
                        },
                    ]}
                    data={usersData}
                    columns={columns}
                />
            </Modal>
        </Fragment>
    );
}
