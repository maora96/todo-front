import { Header } from "../../components/header";
import styles from "./styles.module.scss";

export function Home() {
  return (
    <div className={styles["container"]}>
      <Header />
    </div>
  );
}
