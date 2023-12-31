import { Injectable } from '@nestjs/common';

import { CreateTodoDTO, UpdateTodoDTO } from '@iwill/lib/types';

import { MongoTodoRepository } from '../infra/repositories/todo-repository';
import { GetTodosUsecase } from './usecases/get-todos.usecase';
import { CreateTodosUsecase } from './usecases/create-todo.usecase';
import { UpdateTodosUsecase } from './usecases/update-todo.usecase';
import { DeleteTodosUsecase } from './usecases/delete-todo.usecase';

@Injectable()
export class TodoService {
  constructor(private todoRepository: MongoTodoRepository) {}

  getTodos() {
    const getTodosUsecase = new GetTodosUsecase(this.todoRepository);
    return getTodosUsecase.execute();
  }

  createTodo(data: CreateTodoDTO) {
    const createTodoUsecase = new CreateTodosUsecase(this.todoRepository);
    return createTodoUsecase.execute(data);
  }

  updateTodo(id: string, data: UpdateTodoDTO) {
    const updateTodoUsecase = new UpdateTodosUsecase(this.todoRepository);
    return updateTodoUsecase.execute({ id, ...data });
  }

  deleteTodo(id: string) {
    const deleteTodoUsecase = new DeleteTodosUsecase(this.todoRepository);
    return deleteTodoUsecase.execute(id);
  }
}
