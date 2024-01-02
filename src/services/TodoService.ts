import { todoRepository } from "@/data/repositories";
import { TodoEntity } from "@/data/local";
import { Todo } from "@/models";

import AbstractService from "./AbstractService";
import DayService from "./DayService";
import TagService from "./TagService";

class TodoService extends AbstractService<TodoEntity, Todo> {
  private dayService!: DayService;
  private tagService!: TagService;

  constructor() {
    super(todoRepository);
  }

  public initialize(dayService: DayService, tagService: TagService) {
    this.dayService = dayService;
    this.tagService = tagService;
  }

  public entityToType(entity: TodoEntity): Todo {
    return {
      id: entity.id,
      done: entity.done,
      content: entity.content,
      order: entity.order,
      urgent: entity.urgent,
      important: entity.important,
      day: entity.day ? this.dayService.entityToType(entity.day) : undefined,
      tag: entity.tag ? this.tagService.entityToType(entity.tag) : undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

export default TodoService;
