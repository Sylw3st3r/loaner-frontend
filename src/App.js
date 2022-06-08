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

function App() {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return (
            <Fragment>
                <BrowserRouter>
                    <Navbar></Navbar>
                    <Routes>
                        <Route path="/home" element={<Home></Home>} />
                        <Route path="/*" element={<Navigate to="/home" />} />
                        <Route
                            path="/users"
                            element={<UsersTable></UsersTable>}
                        />
                        <Route
                            path="/user/:userId"
                            element={<UserDetails></UserDetails>}
                        />
                        <Route path="/addloan" element={<AddLoan></AddLoan>} />
                        <Route path="/myloans" element={<MyLoans></MyLoans>} />
                        <Route
                            path="/loans"
                            element={<LoansTable></LoansTable>}
                        />
                        <Route
                            path="/apply"
                            element={<ApplyForLoaner></ApplyForLoaner>}
                        ></Route>
                        <Route
                            path="/applications/lender"
                            element={
                                <ApplicationsForLoaner></ApplicationsForLoaner>
                            }
                        ></Route>
                        <Route
                            path="/applications/loans"
                            element={
                                <ApplicationsForLoanTable></ApplicationsForLoanTable>
                            }
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn></SignIn>} />{" "}
                    <Route path="/*" element={<SignIn></SignIn>} />
                    <Route path="/signup" element={<SignUp></SignUp>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
