import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import Button from "./Button";
import {GiHamburgerMenu} from "react-icons/gi";
import {IoClose} from "react-icons/io5";

const Nav = () => {
    let Links = [
        {name: 'DASHBOARD', path: '/'},
        {name: 'CLIENTES', path: '/clientes'}
    ];
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <div className="shadow-md w-full fixed top-0 left-0">
                <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
                    <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
                        Ripley
                    </div>
                    <div onClick={() => setOpen(!open)} className="absolute right-8 top-6 cursor-pointer md:hidden">
                        {open ?
                            <IoClose className="w-6 h-6"/>
                            :
                            <GiHamburgerMenu className="w-6 h-6"/>
                        }
                    </div>
                    <ul className={`md:flex md:items-center md:pb-0 pb-10 absolute md:static
                        bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-7 
                        transition-all duration-500 ease-in md:opacity-100 ${open ? 'top-[68px] opacity-100' : 'top-[-490px] opacity-0'}`}>
                        {Links.map((link, index) => {
                            return (
                                <li key={index} className="md:ml-8 text-xl md:my-0 my-5">
                                    <Link to={link.path}
                                          className="text-gray-800 hover:text-gray-400 duration-500">{link.name}</Link>
                                </li>
                            )
                        })}
                        <Button>Get Started</Button>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
export default Nav