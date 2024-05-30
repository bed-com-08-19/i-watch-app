import Image from "next/image";
import styles from "./transactions.module.css";
import { transactions } from "../../lib/data";

const Transactions = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return styles.pending;
      case "Done":
        return styles.done;
      case "Cancelled":
        return styles.cancelled;
      default:
        return "";
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={transaction.image || "/noavatar.png"}
                    alt="profile pic"
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {transaction.name}
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${getStatusClass(transaction.status)}`}>
                  {transaction.status}
                </span>
              </td>
              <td>{transaction.date}</td>
              <td>${transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
