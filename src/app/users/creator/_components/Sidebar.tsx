// "use client";
// import { FaUser, FaCog, FaChartLine, FaMoneyBillWave, FaHome, FaQuestionCircle, FaCoins } from 'react-icons/fa';
// import React from "react";
// import axios from "axios";
// import Link from "next/link";

// const CreatorSidebar = () => {
//   const logout = async () => {
//     try {
//       await axios.get("/api/users/logout");
//       window.location.href = "/auth/signin";
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">
//       <div>
//         <div className="text-center my-6">
//           <h1 className="text-2xl font-bold">Creator Profile</h1>
//         </div>
//         <ul>
//           <li className="my-4">
//             <Link href="/users/creator" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
//               <FaHome className="mr-2" />
//               <span>Home</span>
//             </Link>
//           </li>
//           <li className="my-4">
//             <Link href="/users/creator/profile" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
//               <FaUser className="mr-2" />
//               <span>Profile</span>
//             </Link>
//           </li>
//           <li className="my-4">
//             <Link href="/users/creator/subscribe" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
//               <FaMoneyBillWave className="mr-2" />
//               <span>Subscribe</span>
//             </Link>
//           </li>
//           <li className="my-4">
//             <Link href="/users/creator/transaction" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
//               <FaChartLine className="mr-2" />
//               <span>Withdraw</span>
//             </Link>
//           </li>
//           <li className="my-4">
//             <Link href="/users/creator/topup" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
//               <FaCoins className="mr-2" />
//               <span>Top Up Coins</span>
//             </Link>
//           </li>
//           <li className="my-4">
//             <Link href="/users/creator/settings" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
//               <FaCog className="mr-2" />
//               <span>Settings</span>
//             </Link>
//           </li>
//           <li className="my-4">
//             <Link href="/users/creator/help" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
//               <FaQuestionCircle className="mr-2" />
//               <span>Help</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <button
//         onClick={logout}
//         className="mt-4 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default CreatorSidebar;


'use client'
import axios from "axios";
import { SIDENAV_ITEMS } from '@/app/menu_constants';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useSideBarToggle } from '../../hooks/use-sidebar-toggle';
import SideBarMenuGroup from '../../components/sidebar-menu-group';
import { FaUser, FaCog, FaChartLine, FaMoneyBillWave, FaHome, FaQuestionCircle, FaCoins, FaSignOutAlt } from 'react-icons/fa';
// import { SideBarLogo } from '../../../../../components/sidebar-logo';


export const SideBar = () => {
    const [mounted, setMounted] = useState(false);
    const { toggleCollapse } = useSideBarToggle();

    const asideStyle = classNames("sidebar overflow-y-auto overflow-x-auto fixed bg-gray-900 h-full shadow-sm shadow-slate-500/40 transition duration-300 ease-in-out z-[99999]",
        {
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
            <div className="sidebar-top relative flex items-center px-3.5 py-5">
                {mounted}
                <h3 className={classNames("pl-2 font-bold text-2xl min-w-max text-sidebar-foreground",
                    { hidden: toggleCollapse })}>
                    Creator Profile</h3>
            </div>
            <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
                <div className="flex flex-col gap-2 px-4">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <SideBarMenuGroup key={idx} menuGroup={item} />;
                    })}
                </div>
                <button
                    onClick={logout}
                    className="flex items-center justify-center rounded m-4 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer"
                >
                    <FaSignOutAlt className="mr-2" size={20}/> <span>Logout</span>
                </button>
            </nav>
        </aside>
    )
}

