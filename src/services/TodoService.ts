import { DeepPartial } from "typeorm";

import { Todo } from "@/models";
import { TodoEntity, TodoRepository, todoRepository } from "@/database";

import AbstractService from "./AbstractService";
import DayService from "./DayService";
import TagService from "./TagService";

class TodoService extends AbstractService<TodoEntity, Todo, TodoRepository> {
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
    payload: DeepPartial<TodoEntity> & { id: string },
  ): Promise<Todo> {
    if (payload.day?.id) {
      await this.dayService.getOneOrCreate(payload.day.id);
    }

    const entity = await this.repository.getOne(payload.id);
    if (entity.day?.id !== payload.day?.id) {
      payload.order = await this.repository.getNextOrder();
    }

    return super.update(payload);
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
