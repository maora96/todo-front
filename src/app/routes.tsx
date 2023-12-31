import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import { Signup } from "../pages/signup";
import { CreateTask } from "../pages/createTask";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/create-task" element={<CreateTask />} />
    </Routes>
  );
}
