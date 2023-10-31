import { api } from ".";

export const login = async (request: User) => {
  return api.post("/auth/login", {
    ...request,
  });
};
