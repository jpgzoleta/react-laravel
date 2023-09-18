import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "../css/app.css";

const router = createBrowserRouter([
    {
        path: "/",
        exact: true,
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
]);

function Main() {
    return (
        <React.StrictMode>
            <Toaster
                position="bottom-center"
                containerStyle={{
                    top: 40,
                    left: 40,
                    bottom: 40,
                    right: 40,
                }}
                toastOptions={{
                    duration: 5000,
                    className:
                        "max-w-[200px] font-body text-white rounded-md shadow-md p-3",
                    style: {
                        background: "#3c3744",
                        color: "#fff",
                    },
                }}
            />
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
