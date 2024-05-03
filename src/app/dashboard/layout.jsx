import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"
import Footer from "../ui/dashboard/footer/footer"

const Layout = ({children}) => {
  return (
    <div className="flex">
      <div className="flex-1 bg-[#182237] p-5 min-h-screen">
        <Sidebar/>
      </div>
      <div className="flex-4 p-2">
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout