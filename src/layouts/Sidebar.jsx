import React, {Fragment} from 'react';
import {IoSearchSharp} from "react-icons/io5";
import ripley from '../assets/img/ripley.svg'
import {Link, NavLink} from "react-router-dom";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {RiTeamLine} from "react-icons/ri";
import {GiHamburgerMenu} from "react-icons/gi";

const Sidebar = ({children}) => {
    const Menu = [
        {
         path: '/',
         icon: <MdOutlineSpaceDashboard className="w-7 h-7 text-gray-400 group-hover:text-yellow-400 mr-2"/>,
         name: 'Dashboard'
        },
        {
            path: '/clientes',
            icon: <RiTeamLine className="w-7 h-7 text-gray-400 mr-2 group-hover:text-yellow-400"/>,
            name: 'Clientes'
        }
    ]
    return (
        <Fragment>
            <div className="flex min-h-screen">
                <div className="drop-shadow-2xl md:w-72 bg-white border-r border-gray-200 md:block hidden">
                    <div className="pt-4 pb-6 px-6">
                        <Link to="/">
                            <img src={ripley} className="h-20 w-full" alt=""/>
                        </Link>
                    </div>
                    <div className="mb-10 px-3">
                        <h3 className="mx-6 mb-4 text-xs text-gray-400 uppercase tracking-widest">
                            Menu Principal
                        </h3>
                        {
                            Menu.map((menu,index) => {
                                return(
                                    <NavLink exact to={menu.path} key={index}
                                          className="mt-2 text-[18px] flex items-center px-6 py-2.5 hover:text-purple-800 tracking-wide"
                                          activeClassName ="font-extrabold text-yellow-400 bg-purple-800 hover:text-yellow-400 hover:bg-purple-800 rounded-lg group"
                                    >
                                        {menu.icon}
                                        {menu.name}
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex-1 bg-gray-50">
                    <div className="flex items-center p-6 bg-white border-b">
                        <div className="cursor-pointer md:hidden">
                            <GiHamburgerMenu className="w-6 h-6 text-gray-600"/>
                        </div>
                        <form className="pl-7 md:pl-0 w-full max-w-lg">
                            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
                                <IoSearchSharp className="w-5 h-5 absolute ml-3 pointer-events-none"/>
                                <input
                                    className="w-full pr-3 pl-10 py-2 font-semibold
                              placeholder-gray-400 text-black rounded-2xl border-none ring-2 ring-gray-300
                              focus:ring-gray-400 focus:ring-2"
                                    type="text" name="search" placeholder="Buscar aquí...." autoComplete="off"/>
                            </div>
                        </form>
                    </div>
                    <div className="pt-8 px-14">
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Sidebar;