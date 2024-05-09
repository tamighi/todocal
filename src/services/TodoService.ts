import { RRule } from "rrule";

import { Todo } from "@/models";
import { TodoEntity, TodoRepository, todoRepository } from "@/database";

import AbstractService from "./AbstractService";
import DayService from "./DayService";
import TagService from "./TagService";

class TodoService extends AbstractService<TodoEntity, Todo, TodoRepository> {
  constructor(
    private dayService: DayService,
    private tagService: TagService,
  ) {
    super(todoRepository);
  }

  public async getByDay(dayId: string) {
    const todos = await this.repository.getByDay(dayId);
    return todos.map((todo) => this.entityToType(todo));
  }

  public override async create(payload: Partial<Todo>): Promise<Todo> {
    if (payload.day?.id) {
      await this.dayService.getOneOrCreate(payload.day.id);
    }
    return super.create(payload);
  }

  public override async update(
    payload: Partial<Todo> & { id: string },
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
      rRule: entity.rRule ? RRule.fromString(entity.rRule) : undefined,
      day: entity.day ? this.dayService.entityToType(entity.day) : undefined,
      tag: entity.tag ? this.tagService.entityToType(entity.tag) : undefined,
    };
  }

  public typeToEntity(obj: Todo): TodoEntity {
    return {
      ...obj,
      rRule: obj.rRule ? obj.rRule.toText() : undefined,
    };
  }
}

export default TodoService;
