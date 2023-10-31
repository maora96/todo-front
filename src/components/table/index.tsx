import { useMutation } from "react-query";
import styles from "./styles.module.scss";
import { deleteOne } from "../../api/tasks";
import { useState } from "react";

interface ITable {
  data: Task[];
  refetch: () => void;
}

export function Table({ data, refetch }: ITable) {
  const [deleteError, setDeleteError] = useState<string>();

  const deleteTaskMutation = useMutation(
    async (request: string) => deleteOne(request),
    {
      onSuccess: (data) => {
        refetch();
      },
      onError: (data: any) => {
        setDeleteError(data.response.data.message);
      },
    }
  );

  return (
    <div className={styles["container"]}>
      <div className={styles["table-header"]}>
        <div>Título</div>
        <div>Descrição</div>
        <div>Data de conclusão</div>
        <div>Status</div>
        <div></div>
      </div>
      {data?.map((task: Task) => {
        return (
          <div className={styles["row"]}>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.concludedAt}</div>
            <div>{task.isConcluded === true ? "Concluída" : "A fazer"}</div>
            <div onClick={() => deleteTaskMutation.mutate(task.id)}>
              Deletar
            </div>
          </div>
        );
      })}
    </div>
  );
}
