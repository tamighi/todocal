import { TodoRepository } from "@/data/repositories";
import { TodoEntity } from "@/data/local";
import { Todo } from "@/models";

import AbstractService from "./AbstractService";
import DayService from "./DayService";

// Repository to use in constructor
const todoRepository = new TodoRepository();

class TodoService extends AbstractService<TodoEntity, Todo> {
  constructor() {
    super(todoRepository);
  }

  public entityToType(entity: TodoEntity): Todo {
    return {
      id: entity.id,
      done: entity.done,
      content: entity.content,
      day: entity.day ? DayService.entityToType(entity.day) : undefined,
    };
  }
}

export default new TodoService();
