import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextComponent from "./AuthContextComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextComponent>
        <App />
    </AuthContextComponent>
);
