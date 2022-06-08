import MaterialTable from "material-table";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const deleteUser = async (id, token) => {
    const response = await fetch(
        `https://arcane-ocean-08535.herokuapp.com/users/id=${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log(response.status);
    return;
};

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
            setUsersData(data);
        })();
    }, [token]);

    const columns = [
        {
            title: "",
            render: rowData => {
                const button = (
                    <span
                        className=""
                        title="Read More"
                        onClick={() => {
                            nav(`../user/${rowData.id}`);
                        }}
                    >
                        <button
                            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                            tabIndex="0"
                            type="button"
                        >
                            <span className="MuiIconButton-label">
                                <span
                                    className="material-icons MuiIcon-root"
                                    aria-hidden="true"
                                >
                                    read_more
                                </span>
                            </span>
                            <span className="MuiTouchRipple-root"></span>
                        </button>
                    </span>
                );
                return button;
            },
        },
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
            render: rowData =>
                rowData.roles.map(role => role.name.substring(5)).join(","),
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
                editable={{
                    onRowDelete: userRow =>
                        new Promise((resolve, reject) => {
                            const index = userRow.tableData.id;
                            const updatedRows = [...usersData];
                            updatedRows.splice(index, 1);
                            try {
                                deleteUser(userRow.id, token).then(response => {
                                    setUsersData(updatedRows);
                                    resolve();
                                });
                            } catch (err) {
                                console.log(err);
                                reject();
                            }
                        }),
                }}
            />
        </Modal>
    );
}
