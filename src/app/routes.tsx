import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import { Task } from "../pages/task";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<Task />} />
    </Routes>
  );
}
