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

  public initialize(dayService: DayService, tagService: TagService) {
    this.dayService = dayService;
    this.tagService = tagService;
  }

  public override async create(
    payload: DeepPartial<TodoEntity>,
  ): Promise<Todo> {
    if (payload.day?.id) {
      await this.dayService.getOneOrCreate(payload.day.id);
    }
    return super.create(payload);
  }

  public override async update(
    id: string,
    payload: DeepPartial<TodoEntity>,
  ): Promise<Todo> {
    if (payload.day?.id) {
      await this.dayService.getOneOrCreate(payload.day.id);
    }
    return super.update(id, payload);
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
