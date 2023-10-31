import { api } from ".";

export const login = async (request: CreateUserDTO) => {
  return api.post("/auth/login", {
    ...request,
  });
};
