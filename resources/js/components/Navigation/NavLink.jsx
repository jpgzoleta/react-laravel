import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({ name = "", to = "/", icon = <></> }) {
    return (
        <Link
            to={to}
            className="hover:underline font-semibold flex items-center gap-2"
        >
            {icon}
            {name}
        </Link>
    );
}
