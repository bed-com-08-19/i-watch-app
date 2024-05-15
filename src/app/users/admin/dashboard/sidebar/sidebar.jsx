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

// Sidebar component definition
const Sidebar = () => {
  
  const [username, setUsername] = useState(""); // State for storing the username

  useEffect(() => {
    // Define an asynchronous function inside useEffect to fetch user details
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUsername(res.data.data.username); // Update the state with the username
      } catch (error) {
        console.error(error.message);
        // Handle errors
      }
    };

    getUserDetails(); // Call the asynchronous function
  }, []); 

  return (
    <div className={styles.sidebar}>
      <div className={styles.userDetails}>
        <span className={styles.username}>{username}</span>
        <span className={styles.userRole}>Administrator</span>
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
