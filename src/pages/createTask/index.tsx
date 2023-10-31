import { useForm } from "react-hook-form";
import { Header } from "../../components/header";
import styles from "./styles.module.scss";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../api/tasks";
import { useState } from "react";

type FormValues = {
  title: string;
  description: string;
  isConcluded: boolean;
  concludedAt: Date | null;
};

export function CreateTask() {
  const [createTaskError, setCreateTaskError] = useState();

  const getUserId = () => {
    const storageUser = localStorage.getItem("user");

    if (storageUser) {
      const user = JSON.parse(storageUser);

      return user.id;
    }
  };

  const createTaskMutation = useMutation(
    async (request: CreateTaskDTO) => createTask(request),
    {
      onSuccess: () => {
        navigate("/");
      },
      onError: (data: any) => {
        setCreateTaskError(data.response.data.message);
      },
    }
  );

  const onSubmit = (data: FormValues) => {
    const userId = getUserId();
    const request = {
      ...data,
      userId,
    };
    createTaskMutation.mutate(request);
  };

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormValues>();
  return (
    <div className={styles["container"]}>
      <Header />
      <h2>Criar tarefa</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <input
          {...register("title", { required: true })}
          placeholder="Título"
        />
        <textarea {...register("description")} placeholder="Descrição" />
        <div className={styles["checkbox"]}>
          <input type="checkbox" {...register("isConcluded")} />
          <span>Concluída?</span>
        </div>
        <input type="submit" className={styles["submit"]} />
      </form>
    </div>
  );
}
