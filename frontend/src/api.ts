import { Task, TaskStatus } from "./App.type";

const TASKS_API_URL = "http://localhost:3000/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(TASKS_API_URL);
  return response.json();
};

export const addNewTask = async (
  name: string,
  listId: number
): Promise<Task> => {
  const response = await fetch(TASKS_API_URL, {
    method: "POST",
    body: JSON.stringify({ name, listId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const updateTask = async (
  id: number,
  status: TaskStatus
): Promise<Task> => {
  const response = await fetch(`${TASKS_API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getTaskList = async (id: number): Promise<Task[]> => {
  const response = await fetch(`${TASKS_API_URL}/list/${id}`);
  return response.json();
};
