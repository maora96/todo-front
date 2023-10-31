import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { createUser } from "../../api/user";

type FormValues = {
  username: string;
  password: string;
  confirm_password: string;
};

export function Signup() {
  const [usernameError, setUsernameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const navigate = useNavigate();

  const createUserMutation = useMutation(
    async (request: User) => createUser(request),
    {
      onSuccess: (data) => {
        const user = {
          username: data.data.username,
          id: data.data.id,
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/login");
      },
      onError: (data: any) => {
        setUsernameError(data.response.data.message);
      },
    }
  );

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    if (data.password === data.confirm_password) {
      const request = {
        username: data.username,
        password: data.password,
      };
      createUserMutation.mutate(request);
    } else {
      setPasswordError("Senhas não conferem.");
    }
  };

  return (
    <div className={styles["container"]}>
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <input
          {...register("username", { required: true })}
          placeholder="Username"
        />
        <input {...register("password")} placeholder="Senha" type="password" />
        {passwordError && <span>{passwordError}</span>}

        <input
          {...register("confirm_password")}
          placeholder="Confirme sua senha"
          type="password"
        />

        {usernameError && <span>{usernameError}</span>}
        <input type="submit" className={styles["submit"]} />
        <span>
          Tem conta?{" "}
          <span className={styles["span"]} onClick={() => navigate("/login")}>
            Entrar
          </span>
        </span>
      </form>
    </div>
  );
}
