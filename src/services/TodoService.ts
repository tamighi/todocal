import { todoRepository } from "@/data/repositories";
import { TodoEntity } from "@/data/local";
import { Todo } from "@/models";

import AbstractService from "./AbstractService";
import DayService from "./DayService";

class TodoService extends AbstractService<TodoEntity, Todo> {
  private dayService!: DayService;

  constructor() {
    super(todoRepository);
  }

  public initialize(dayService: DayService) {
    this.dayService = dayService;
  }

  public entityToType(entity: TodoEntity): Todo {
    return {
      id: entity.id,
      done: entity.done,
      content: entity.content,
      day: entity.day ? this.dayService.entityToType(entity.day) : undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

export default TodoService;
