import styles from "./addCustomer.module.css";

const addCustomer = () => {
    return(
        <div className={styles.container}>
        <form className={styles.form}>
          <input type="text" placeholder="company name" name="company" required />
          <input type="email" placeholder="email" name="email" required />
          <input type="phone" placeholder="phone" name="phone" />
          <select name="isActive" id="isActive">
            <option value={true}>
              Is Active?
            </option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <textarea
            name="address"
            id="address"
            rows="8"
            placeholder="Address"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
}

export default addCustomer;