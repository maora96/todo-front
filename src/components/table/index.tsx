import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface ITable {
  data: Task[];
}

export function Table({ data }: ITable) {
  const navigate = useNavigate();

  return (
    <div className={styles["container"]}>
      {data?.map((task: Task) => {
        return <li>{task.title}</li>;
      })}
    </div>
  );
}
