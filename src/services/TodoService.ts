import { DeepPartial } from "typeorm";

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

  public async update(id: string, payload: DeepPartial<TodoEntity>) {
    // Get the day or create it if it does not exist.
    if (payload.day?.id) {
      await this.dayService.getOne(payload.day.id);
    }
    return super.update(id, payload);
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
