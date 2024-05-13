"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'

const MenuLink = ({item}) => {

  const pathname = usePathname()

  return (
    <Link href={item.path} className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink