import React from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { House, SignOut, Bag } from "@phosphor-icons/react";

function Header() {
    return (
        <nav className="flex justify-between shadow-lg items-center px-8 py-4 sticky top-0 w-full bg-white border-b z-50 border-gray-300">
            <Link to={"/"} className="font-display font-bold text-2xl">
                <span className="text-[#087da4]">React</span>
                <span className="text-[#F05340] italic">Laravel</span>
            </Link>
            <ul className="flex items-center gap-4">
                <NavLink
                    to="/"
                    name="Home"
                    icon={<House size={18} className="text-gray-500" />}
                />
                <NavLink
                    to="/products"
                    name="Products"
                    icon={<Bag size={18} className="text-gray-500" />}
                />
                <div className="border-gray-300 border-l w-[1px] h-[20px]"></div>
                <NavLink
                    to="/login"
                    name="Logout"
                    icon={<SignOut size={18} className="text-gray-500" />}
                />
            </ul>
        </nav>
    );
}

export default Header;
