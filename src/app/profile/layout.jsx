'use client'
import Sidebar from "./sidebar/sidebar"
import styles from "./profile.module.css"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Layout