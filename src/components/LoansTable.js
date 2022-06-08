import MaterialTable from "material-table";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import AddLoanApplication from "./AddLoanApplication";
import Modal from "./Modal";

const getLoans = async token => {
    console.log(token);
    const response = await fetch(
        `https://arcane-ocean-08535.herokuapp.com/loans`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return await response.json();
};

export default function LoansTable() {
    const [usersData, setUsersData] = useState([]);
    const [body, setBody] = useState(null);
    const { token, email } = useContext(AuthContext);

    useEffect(() => {
        (async function () {
            const data = await getLoans(token);
            console.log(data);
            setUsersData(data);
        })();
    }, [token]);

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
            title: "Interest Rate",
            field: "interestRate",
        },
        {
            title: "Sum",
            field: "sum",
        },
    ];

    return (
        <Fragment>
            {body && (
                <AddLoanApplication closeHandler={setBody} requestBody={body} />
            )}
            <Modal>
                <MaterialTable
                    title="Loans"
                    actions={[
                        {
                            icon: "add",
                            tooltip: "Apply for Loan",
                            onClick: (event, rowData) => {
                                setBody({
                                    loanId: rowData.id,
                                    receiverEmail: rowData.loanCreator.email,
                                    senderEmail: email,
                                });
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
