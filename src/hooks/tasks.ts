import { useQuery } from "react-query";
import { getMany, getOne } from "../api/tasks";

export const useGetTasks = (userId: string) => {
  return useQuery(["getTasks", userId], async () => getMany(userId), {
    staleTime: 5000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export const useGetSingleTask = (id: string) => {
  return useQuery("getSingleTask", async () => getOne(id), {
    staleTime: 5000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

// export const useGetManyProcesses = () => {
//   return useQuery("getAllProcess", async () => getMany(), {
//     staleTime: 5000,
//     refetchOnWindowFocus: false,
//     keepPreviousData: true,
//   });
// };
