import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../../api/auth";
import { useState } from "react";

type FormValues = {
  username: string;
  password: string;
};

export function Login() {
  const [loginError, setLoginError] = useState<string>();

  const navigate = useNavigate();

  const loginMutation = useMutation(
    async (request: CreateUserDTO) => login(request),
    {
      onSuccess: (data) => {
        const token = data.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      },
      onError: (data: any) => {
        setLoginError(data.response.data.message);
      },
    }
  );

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className={styles["container"]}>
      <h1>Bem vindo!</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <input
          {...register("username", { required: true })}
          placeholder="Username"
        />
        <input {...register("password")} placeholder="Password" />

        {loginError && <span>{loginError}</span>}
        <input type="submit" className={styles["submit"]} />
        <span>
          Não tem conta?{" "}
          <span onClick={() => navigate("/signup")}>Registrar</span>
        </span>
      </form>
    </div>
  );
}
