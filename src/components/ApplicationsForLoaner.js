import MaterialTable from "material-table";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Modal from "./Modal";

const getApplications = async token => {
    const response = await fetch(
        "https://arcane-ocean-08535.herokuapp.com/application/lenders",
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

const confirmApplications = async (token, id) => {
    await fetch(
        `https://arcane-ocean-08535.herokuapp.com/application/lenders/${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                accepted: true,
                applicationId: id,
                message: "Accepted",
            }),
        }
    );
    return;
};

export default function ApplicationsForLoaner() {
    const [usersData, setUsersData] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        (async function () {
            const data = await getApplications(token);
            const newData = data.map(a => {
                const { applicationCreator, accepted, ...rest } = a;
                return {
                    ...rest,
                    userId: applicationCreator.id,
                    accepted: accepted ? "True" : "False",
                };
            });
            setUsersData(newData);
        })();
    }, [token, trigger]);

    const columns = [
        {
            title: "Id",
            field: "id",
        },
        {
            title: "User Id",
            field: "userId",
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
            title: "Accepted",
            field: "accepted",
        },
    ];

    return (
        <Modal>
            <MaterialTable
                actions={[
                    {
                        icon: "check",
                        tooltip: "Confirm User Application",
                        onClick: (event, rowData) => {
                            if (rowData.accepted === "False") {
                                try {
                                    confirmApplications(token, rowData.id);
                                    setTimeout(() => {
                                        setTrigger(trigger + 1);
                                    }, 50);
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        },
                    },
                ]}
                title="Applications"
                data={usersData}
                columns={columns}
            />
        </Modal>
    );
}
