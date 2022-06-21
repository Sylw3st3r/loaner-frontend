import MaterialTable from "material-table";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const getUsers = async token => {
    const response = await fetch(
        "https://arcane-ocean-08535.herokuapp.com/users",
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

export default function UsersTable() {
    const nav = useNavigate();

    const [usersData, setUsersData] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        (async function () {
            const data = await getUsers(token);
            console.log(data);
            const data2 = data.map(user => {
                const { roles, ...rest } = user;
                const a = {
                    roles: roles.map(role => role.name.substring(5)).join(","),
                    ...rest,
                };
                return a;
            });

            setUsersData(data2);
        })();
    }, [token]);

    const columns = [
        {
            title: "Id",
            field: "id",
        },
        {
            title: "First Name",
            field: "firstName",
        },
        {
            title: "LastName",
            field: "lastName",
        },
        {
            title: "Email",
            field: "email",
        },
        {
            title: "Roles",
            field: "roles",
        },
        {
            title: "Age",
            field: "age",
        },
    ];

    return (
        <Modal>
            <MaterialTable
                title="Users"
                data={usersData}
                columns={columns}
                actions={[
                    {
                        icon: "read_more",
                        tooltip: "Read More",
                        onClick: (event, rowData) => {
                            nav(`../user/${rowData.id}`);
                        },
                    },
                ]}
            />
        </Modal>
    );
}
