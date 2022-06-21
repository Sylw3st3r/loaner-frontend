import MaterialTable from "material-table";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Modal from "./Modal";

const getLoans = async (token, id) => {
    const response = await fetch(
        `https://arcane-ocean-08535.herokuapp.com/loans/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
};

export default function LoansHistory() {
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
        {
            title: "Sum",
            field: "sum",
        },
        {
            title: "Interest Rate",
            field: "interestRate",
        },
    ];

    return (
        <Fragment>
            <Modal>
                <MaterialTable
                    title="User's loans"
                    data={usersData}
                    columns={columns}
                />
            </Modal>
        </Fragment>
    );
}
