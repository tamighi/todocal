import { Todo } from "@/models";
import { TodoEntity, todoRepository } from "@/database";

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
      ...entity,
      day: entity.day ? this.dayService.entityToType(entity.day) : undefined,
      tag: entity.tag ? this.tagService.entityToType(entity.tag) : undefined,
    };
  }
}

export default TodoService;
