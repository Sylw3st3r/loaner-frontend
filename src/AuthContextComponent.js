import { useEffect, useState } from "react";
import { AuthContext } from "./context/auth-context";
import { useCallback } from "react";

const defaultAuthenticationContext = {
    isLoggedIn: false,
    token: null,
    type: null,
    id: null,
    username: null,
    email: null,
    roles: null,
    setNewContext: () => {},
    logout: () => {},
};

export default function AuthContextComponent({ children }) {
    const [context, setContext] = useState(defaultAuthenticationContext);

    const setNewContext = useCallback(newContext => {
        setContext(oldContext => {
            return { ...oldContext, ...newContext };
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("userData");
        setContext(defaultAuthenticationContext);
    }, []);

    useEffect(() => {
        (async function () {
            if (localStorage.getItem("userData")) {
                const data = localStorage.getItem("userData");
                const parsedData = await JSON.parse(data);
                setContext(parsedData);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...context,
                setNewContext: setNewContext,
                logout: logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
