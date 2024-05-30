import Pagination from "../pagination/pagination";
import Link from "next/link";
import styles from "../users/users.module.css";

const Customers = () =>{
    const count = 5;
    return(
        <div className={styles.container}>
        <div className={styles.top}>
          {/* <Search placeholder="Search for a customer..." /> */}
          <Link href="/dashboard/customers/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Company Name</td>
              <td>Email</td>
              <td>Created At</td>
              <td>No. of Ads</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {/* {custumers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div className={styles.customer}>
                    <Image
                      src={customer.img || "/noavatar.png"}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.customerImage}
                    />
                    {customer.customername}
                  </div>
                </td>
                <td>{customer.email}</td>
                <td>{customer.createdAt?.toString().slice(4, 16)}</td>
                <td>{customer.isAdmin ? "Admin" : "Client"}</td>
                <td>{customer.isActive ? "active" : "passive"}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/custumers/${customer.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <form action={deletecustomer}>
                      <input type="hidden" name="id" value={(customer.id)} />
                      <button className={`${styles.button} ${styles.delete}`}>
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
        <Pagination count={count} />
      </div>
    )
}

export default Customers