import MaterialTable from "material-table";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Modal from "./Modal";

const getLoans = async (token, email) => {
    const response = await fetch(
        `https://arcane-ocean-08535.herokuapp.com/loans/loan?lender=${email}`,
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

export default function MyLoans() {
    const [usersData, setUsersData] = useState([]);
    const { token, email } = useContext(AuthContext);

    useEffect(() => {
        (async function () {
            const data = await getLoans(token, email);
            setUsersData(data);
        })();
    }, [token, email]);

    const columns = [
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Description",
            field: "description",
        },
        {
            title: "Total Ammount",
            field: "sum",
        },
        {
            title: "Interest Rate",
            field: "interestRate",
        },
    ];

    return (
        <Modal>
            <MaterialTable
                title="My Loans"
                data={usersData}
                columns={columns}
            />
        </Modal>
    );
}
