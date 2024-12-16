import { Injectable } from '@nestjs/common';
import { AddTaskDto, Task, TaskStatus, UpdateTaskDto } from './task.type';

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Vacuum the living room',
      status: TaskStatus.Todo,
      createdAt: '2024-10-30T12:00:00.000Z',
      listId: 1,
    },
    {
      id: 2,
      name: 'Dust the kitchen',
      status: TaskStatus.Todo,
      createdAt: '2024-10-30T10:00:00.000Z',
      listId: 1,
    },
    {
      id: 3,
      name: 'Take out the trash',
      status: TaskStatus.Done,
      createdAt: '2024-10-30T08:00:00.000Z',
      listId: 1,
    },
  ];

  private nextId = this.tasks.length + 1;

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(addTaskDto: AddTaskDto): Task {
    const newTask: Task = {
      id: this.nextId++,
      name: addTaskDto.name,
      status: TaskStatus.Todo,
      createdAt: new Date().toISOString(),
      listId: addTaskDto.listId,
    };

    // IRL this would be a database insert
    this.tasks.push(newTask);

    return newTask;
  }

  getTaskList(taskListId: number): Task[] {
    // IRL this would be a database query
    const taskList = this.tasks.filter((task) => task.listId === taskListId);

    if (!taskList) {
      throw new Error(`Task list not found with id ${taskListId}`);
    }

    return taskList;
  }

  getTask(taskId: number): Task {
    // IRL this would be a database query
    const task = this.tasks.find((task) => task.id === taskId);

    if (!task) {
      throw new Error(`Task not found with id ${taskId}`);
    }

    return task;
  }

  updateTask(taskId: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) {
      throw new Error(`Task to be updated not found with id ${taskId}`);
    }
    const updatedTask = { ...task, status: updateTaskDto.status };

    // IRL this would be a database update
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? updatedTask : task,
    );

    return updatedTask;
  }
}
