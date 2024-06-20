import { SideNavItemGroup } from "../../../../../types/type";
import { BsEnvelope, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestionCircle } from "react-icons/bs";
import { FaUser, FaCog, FaChartLine, FaMoneyBillWave, FaHome, FaQuestionCircle, FaCoins } from 'react-icons/fa';



export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboards",
        menuList: [
            {
                title: 'Home',
                path: '/users/creator',
                icon: <FaHome className="mr-2" size={20} />,
            },
            {
                title: 'Profile',
                path: '/users/creator//profile',
                icon: <FaUser className="mr-2" size={20}/>,
            },
            {
                title: 'Subscribe',
                path: '/users/creator/subscribe',
                icon: <FaMoneyBillWave className="mr-2" size={20}/>,
            },
            {
                title: 'Withdraw',
                path: '/users/creator/transaction',
                icon: <FaChartLine className="mr-2" size={20}/>,
            },
            {
                title: 'Top Up Coins',
                path: '/users/creator/topup',
                icon: <FaCoins className="mr-2" size={20}/>,
            },
            {
                title: 'Settings',
                path: '/users/creator/settings',
                icon: <FaCog className="mr-2" size={20}/>,
            },
            {
                title: 'Help',
                path: '/users/creator/help',
                icon: <FaQuestionCircle className="mr-2" size={20}/>,
            }

    ]
}

]