import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { useGetTasks } from "../../hooks/tasks";
import styles from "./styles.module.scss";
import { Table } from "../../components/table";

export function Home() {
  const [user, setUser] = useState<StorageUser | null>(null);

  useEffect(() => {
    const storageUser = localStorage.getItem("user");

    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
  }, [localStorage.getItem("user")]);

  const { data, refetch } = useGetTasks(user?.id!);
  return (
    <div className={styles["container"]}>
      <Header />
      {data?.length !== 0 ? (
        <Table data={data} refetch={refetch} />
      ) : (
        "Nenhuma tarefa cadastrada."
      )}
    </div>
  );
}
