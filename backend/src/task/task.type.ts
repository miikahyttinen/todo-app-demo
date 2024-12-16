export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  createdAt: string;
  listId: number;
}

export interface TaskList {
  id: number;
  tasks: Task[];
}

export enum TaskStatus {
  Todo = 'todo',
  Done = 'done',
}

export interface AddTaskDto {
  name: string;
  listId: number;
}

export interface UpdateTaskDto {
  status: TaskStatus;
}
