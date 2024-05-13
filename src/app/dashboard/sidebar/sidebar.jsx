import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
// import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      // {
      //   title: "Products",
      //   path: "/dashboard/products",
      //   icon: <MdShoppingBag />,
      // },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
      {
        title: "Customers",
        path: "/dashboard/customers",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
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
        <Image
          className="rounded-full object-cover"
          src={"/profile.jpg"}
          alt=""
          width="50"
          height="50"
        />
        <div className="flex flex-col">
          <span className="font-medium"> null </span>
          <span className="text-xs text-gray-500">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-gray-500 font-bold text-sm my-2">{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="p-2 my-1 flex items-center gap-2 cursor-pointer rounded-lg bg-none border-none text-white w-full hover:bg-gray-700">
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
