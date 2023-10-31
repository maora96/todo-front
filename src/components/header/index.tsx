import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header>
      <div className={styles["container"]}>
        <h1>to do</h1>
        <button onClick={logout}>logout</button>
      </div>
    </header>
  );
}
