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
    return data.filter(loan => id === loan.applicationReceiver.id);
};

export default function ApplicationsForLoanTable() {
    const [usersData, setUsersData] = useState([]);
    const { token, id } = useContext(AuthContext);

    useEffect(() => {
        (async function () {
            const data = await getLoans(token, id);
            setUsersData(data);
        })();
    }, [token, id]);

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
    ];

    return (
        <Fragment>
            <Modal>
                <MaterialTable
                    title="Applications For Loan"
                    data={usersData}
                    columns={columns}
                />
            </Modal>
        </Fragment>
    );
}
