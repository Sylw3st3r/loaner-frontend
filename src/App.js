import { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthContext } from "./context/auth-context";
import Navbar from "./components/Navbar";
import UsersTable from "./components/UsersTable";
import UserDetails from "./components/UserDetails";
import Home from "./components/Home";
import AddLoan from "./components/AddLoan";
import MyLoans from "./components/MyLoans";
import LoansTable from "./components/LoansTable";
import ApplyForLoaner from "./components/ApplyForLoaner";
import ApplicationsForLoaner from "./components/ApplicationsForLoaner";
import AddLoanApplication from "./components/AddLoanApplication";
import ApplicationsForLoanTable from "./components/ApplicationsForLoanTable";
import LoansHistory from "./components/LoansHistory";

const routes = [
    {
        path: "/home",
        element: <Home></Home>,
        access: ["ROLE_ADMIN", "ROLE_USER", "ROLE_LENDER"],
    },
    {
        path: "/*",
        element: <Navigate to="/home" />,
        access: ["ROLE_ADMIN", "ROLE_USER", "ROLE_LENDER"],
    },
    {
        path: "/users",
        element: <UsersTable></UsersTable>,
        access: ["ROLE_ADMIN"],
    },
    {
        path: "/user/:userId",
        element: <UserDetails></UserDetails>,
        access: ["ROLE_ADMIN"],
    },
    { path: "/addloan", element: <AddLoan></AddLoan>, access: ["ROLE_LENDER"] },
    { path: "/myloans", element: <MyLoans></MyLoans>, access: ["ROLE_LENDER"] },
    {
        path: "/loans",
        element: <LoansTable></LoansTable>,
        access: ["ROLE_USER"],
    },
    {
        path: "/apply",
        element: <ApplyForLoaner></ApplyForLoaner>,
        access: ["ROLE_USER"],
    },
    {
        path: "/loanshistory",
        element: <LoansHistory></LoansHistory>,
        access: ["ROLE_USER"],
    },
    {
        path: "/applications/lender",
        element: <ApplicationsForLoaner></ApplicationsForLoaner>,
        access: ["ROLE_ADMIN"],
    },
    {
        path: "/applications/loans",
        element: <ApplicationsForLoanTable></ApplicationsForLoanTable>,
        access: ["ROLE_LENDER"],
    },
];

function App() {
    const { isLoggedIn, roles } = useContext(AuthContext);

    if (isLoggedIn) {
        return (
            <Fragment>
                <BrowserRouter>
                    <Navbar></Navbar>
                    <Routes>
                        {routes
                            .filter(r => r.access.includes(roles[0]))
                            .map((r, index) => (
                                <Route
                                    key={index}
                                    path={r.path}
                                    element={r.element}
                                ></Route>
                            ))}
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn></SignIn>} />
                    <Route
                        path="/*"
                        element={<Navigate to="/signin"></Navigate>}
                    />
                    <Route path="/signup" element={<SignUp></SignUp>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
