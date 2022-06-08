import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import classes from "./UserDetails.module.css";
import Modal from "./Modal";
import Spinner from "./Spinner";

export default function UserDetails() {
    const { userId } = useParams();
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const a = +userId;
        if (typeof a === "number" && !isNaN(a)) {
            (async function () {
                setIsLoading(true);
                const response = await fetch(
                    `https://arcane-ocean-08535.herokuapp.com/users/id=${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const u = await response.json();
                setIsLoading(false);
                setUser(u);
            })();
        }
    }, [userId, token]);

    if (isLoading) {
        return <Spinner></Spinner>;
    }

    if (user) {
        return (
            <Modal>
                <div className={classes.center}>
                    <div className={classes.description}>
                        <hr></hr>
                        <h1>{`Id: ${user.id}`}</h1>
                        <hr></hr>
                        <h1>{`First Name: ${user.firstName}`}</h1>
                        <hr></hr>
                        <h1>{`Last Name: ${user.lastName}`}</h1>
                        <hr></hr>
                        <h1>{`Email: ${user.email}`}</h1>
                        <hr></hr>
                        <h1>{`Roles: ${user.roles
                            .map(role => role.name.substring(5))
                            .join(", ")}`}</h1>
                        <hr></hr>
                    </div>
                </div>
            </Modal>
        );
    } else {
        return (
            <Modal>
                <div className={classes.center}>
                    <div className={classes.description}>
                        <hr></hr>
                        <h1>{`User with id: ${userId} not found`}</h1>
                        <hr></hr>
                    </div>
                </div>
            </Modal>
        );
    }
}
