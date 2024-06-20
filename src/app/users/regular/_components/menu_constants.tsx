import { SideNavItemGroup } from "../../../../../types/type";
import { FaUser, FaCog, FaChartLine, FaMoneyBillWave, FaHome, FaQuestionCircle, FaCoins } from 'react-icons/fa';



export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboards",
        menuList: [
            {
                title: 'Home',
                path: '/users/regular',
                icon: <FaHome className="mr-2" size={20} />,
            },
            {
                title: 'Profile',
                path: '/users/regular/profile',
                icon: <FaUser className="mr-2" size={20}/>,
            },
            {
                title: 'Subscribe',
                path: '/users/regular/subscribe',
                icon: <FaMoneyBillWave className="mr-2" size={20}/>,
            },
            {
                title: 'Withdraw',
                path: '/users/regular/transaction',
                icon: <FaChartLine className="mr-2" size={20}/>,
            },
            {
                title: 'Top Up Coins',
                path: '/users/regular/topup',
                icon: <FaCoins className="mr-2" size={20}/>,
            },
            {
                title: 'Settings',
                path: '/users/regular/settings',
                icon: <FaCog className="mr-2" size={20}/>,
            },
            {
                title: 'Help',
                path: '/users/regular/help',
                icon: <FaQuestionCircle className="mr-2" size={20}/>,
            }

    ]
}

]