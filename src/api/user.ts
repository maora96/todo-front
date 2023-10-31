import { api } from ".";

export const createUser = async (request: User) => {
  return api.post("/users", {
    ...request,
  });
};
