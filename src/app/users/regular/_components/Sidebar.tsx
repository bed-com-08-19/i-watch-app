'use client'
import axios from "axios";
import { SIDENAV_ITEMS } from '@/app/users/creator/_components/menu_constants';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useSideBarToggle } from '../../hooks/use-sidebar-toggle';
import SideBarMenuGroup from './sidebar-menu-group';
import { FaSignOutAlt } from 'react-icons/fa';

export const SideBar = () => {
    const [mounted, setMounted] = useState(false);
    const { toggleCollapse } = useSideBarToggle();

    const asideStyle = classNames("sidebar flex flex-col justify-between overflow-y-auto fixed bg-gray-900 h-full shadow-sm shadow-slate-500/40 transition duration-300 ease-in-out z-[99999]", {
        ["w-[20rem]"]: !toggleCollapse,
        ["sm:w-[5.4rem] sm:left-0 left-[-100%]"]: toggleCollapse,
    });

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            window.location.href = "/auth/signin";
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => setMounted(true), []);

    return (
        <aside className={asideStyle}>
            <div>
                <div className="sidebar-top relative flex items-center px-3.5 py-5">
                    {mounted && (
                        <h3 className={classNames("pl-2 font-bold text-2xl min-w-max text-sidebar-foreground", { hidden: toggleCollapse })}>
                            User Profile
                        </h3>
                    )}
                </div>
                <nav className="flex flex-col gap-2 px-4">
                    {SIDENAV_ITEMS.map((item, idx) => (
                        <SideBarMenuGroup key={idx} menuGroup={item} />
                    ))}
                </nav>
            </div>
            <button
                onClick={logout}
                className="flex items-center justify-center rounded m-4 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer"
            >
                <FaSignOutAlt className="mr-2" size={20} />
                {!toggleCollapse && <span>Logout</span>}
            </button>
        </aside>
    );
}
