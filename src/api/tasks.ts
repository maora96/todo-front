import { api } from ".";

export const getOne = async (id: string) => {
  const { data } = await api.get(`/tasks/${id}`);

  return data.result;
};

export const getMany = async (userId: string) => {
  const { data } = await api.get(`/tasks/user/${userId}`);

  return data.result;
};

export const createTask = async (request: CreateTaskDTO) => {
  return api.post("/tasks", {
    ...request,
  });
};
