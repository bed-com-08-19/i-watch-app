"use client"
import { useEffect, useState } from "react";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdAttachMoney,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import axios from "axios";

// Define the menu items
const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/users/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/users/admin/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Transactions",
        path: "/users/admin/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
      {
        title: "Customers",
        path: "/users/admin/dashboard/customers",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];


const Sidebar = async () => {
  
  useEffect(() => {
    getUserDetails();
  }, []);
  
  // const { user } = await auth();
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username); // Update the state with the username
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="sticky top-10">
      <div className="flex items-center gap-2 mb-10">
        {/* <Image
          className="rounded-full object-cover"
          src={""}
          alt=""
          width="50"
          height="50"
        /> */}
        <div className="flex flex-col">
          <span className="font-medium"> {username}</span>
          <span className="text-xs text-gray-500">Administrator</span>
        </div>
      </div>
      <ul className={styles.menu}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.categoryTitle}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          // Handle logout action
          await signOut();
        }}
      >
        <button className={styles.logoutButton}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
