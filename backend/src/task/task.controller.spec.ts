import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.type';

describe('TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
  });

  describe('getTasks', () => {
    it('should return default tasks', () => {
      const defaultTasks: Task[] = [
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
      expect(taskController.getTasks()).toEqual(defaultTasks);
    });
  });

  describe('addTask', () => {
    it('should add a task', () => {
      taskController.addTask({
        name: 'Buy groceries',
        listId: 3,
      });
      const newTask = taskController.getTask('4');
      expect(newTask.name).toEqual('Buy groceries');
      expect(newTask.listId).toEqual(3);
      expect(newTask.status).toEqual(TaskStatus.Todo);
    });
  });
});
