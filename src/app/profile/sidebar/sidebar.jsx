import React, { useState, useEffect } from 'react';
import MenuLink from "./menuLink/menuLink";
import { FiUpload } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { users } from "../../lib/data";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdHelpCenter,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Profile",
        path: "/profile",
        icon: <MdDashboard />,
      },
      {
        title: "Upload",
        path: "",
        icon: <FiUpload />,
      },
      {
        title: "Withdraw",
        path: "/profile/withdraw",
        icon: <BiMoneyWithdraw />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/profile/settings",
        icon: <CiSettings />,
      },
      {
        title: "Help",
        path: "/profile/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Hamburger menu for mobile */}
      <div className={`block md:hidden p-4 ${styles.hamburgerMenu}`}>
        <MdMenu onClick={toggleSidebar} />
      </div>
      <div className={`sticky top-20 ${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <ul className="list-none">
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className="text-gray-500 w-full font-bold text-sm my-2">{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </li>
          ))}
        </ul>
        <form
          action={async () => {
            // "use server";
            await signOut();
          }}
        >
          <button className="p-2 my-10 flex items-center gap-2 cursor-pointer rounded-lg bg-red-500 border-none text-white w-full hover:bg-red-800">
            <FiLogOut />
            Logout
          </button>
        </form>
      </div>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
