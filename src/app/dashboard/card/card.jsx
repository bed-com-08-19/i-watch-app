import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
// import {useFormmatter} from "next-intl";

const Card = ({ item }) => {
  // const format = useFormmatter;
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}></span>
        <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
