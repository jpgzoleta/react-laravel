import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({ name = "", to = "/" }) {
    return (
        <Link to={to} className="hover:underline font-semibold">
            {name}
        </Link>
    );
}
