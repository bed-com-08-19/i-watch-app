
import Navbar from "../../../../components/Navbar";
import Sidebar from "./sidebar/sidebar";
import styles from "./dashboard.module.css";
import Loader from "../../../components/Loader";


const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {loading ? <Loader /> : children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;