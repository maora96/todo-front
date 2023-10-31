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
      onSuccess: (data) => {
        console.log(data);
        // const token = data.data.token;
        // localStorage.setItem("token", JSON.stringify(token));
        // const user = {
        //   username: data.data.username,
        //   id: data.data.id,
        // };
        // localStorage.setItem("user", JSON.stringify(user));
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
    console.log(request);
    createTaskMutation.mutate(request);
  };

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormValues>();
  return (
    <div className={styles["container"]}>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <input
          {...register("title", { required: true })}
          placeholder="Título"
        />
        <textarea {...register("description")} placeholder="Descrição" />
        <input type="checkbox" {...register("isConcluded")} />
        <input type="submit" className={styles["submit"]} />
      </form>
    </div>
  );
}
