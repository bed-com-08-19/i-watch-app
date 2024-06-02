"use client"

// import Link from 'next/link'
// import styles from './menuLink.module.css'
// import { usePathname } from 'next/navigation'

// const MenuLink = ({item}) => {

//   const pathname = usePathname()

//   return (
//     <Link href={item.path} >
//       {item.icon}
//       {item.title}
//     </Link>
//   )
// }

// export default MenuLink

import React from 'react';
import Link from 'next/link';
import styles from './menuLink.module.css';

const MenuLink = ({ item }) => {
  return (
    <li className="flex items-center p-2 text-white">
      <Link href={item.path} className="p-2 flex items-center w-full gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
        {item.icon}
        <span className={`${styles.menuItemTitle}`}>{item.title}</span>
      </Link>
    </li>
  );
};

export default MenuLink;
