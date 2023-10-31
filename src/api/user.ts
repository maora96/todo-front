import { api } from ".";

export const createUser = async (request: CreateUserDTO) => {
  return api.post("/users", {
    ...request,
  });
};
