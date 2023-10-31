type User = {
  username: string;
  password: string;
};

type StorageUser = {
  username: string;
  id: string;
};

type ApiUser = {
  id: string;
  username: string;
  createdAt: Date;
};

type Task = {
  id: string;
  title: string;
  description: string;
  user: ApiUser;
  createdAt: Date;
  isConcluded: boolean;
  concludedAt: boolean | null;
};

type CreateTaskDTO = {
  title: string;
  description: string;
  isConcluded: boolean;
  concludedAt: Date | null;
  userId: string;
};
