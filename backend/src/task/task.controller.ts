import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto, Task, UpdateTaskDto } from './task.type';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Get('/list/:id')
  getTaskList(@Param('id') id: string): Task[] {
    const taskListId = parseInt(id);
    return this.taskService.getTaskList(taskListId);
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    const taskId = parseInt(id);
    return this.taskService.getTask(taskId);
  }

  @Post()
  addTask(@Body() requestBody: AddTaskDto): Task {
    const createdTask = this.taskService.createTask(requestBody);
    return createdTask;
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() requestBody: UpdateTaskDto,
  ): Task {
    const taskId = parseInt(id);
    return this.taskService.updateTask(taskId, requestBody);
  }
}
