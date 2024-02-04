import { DayEntity, dayRepository } from "@/database";
import { Day } from "@/models";

import AbstractService from "./AbstractService";
import TodoService from "./TodoService";

class DayService extends AbstractService<DayEntity, Day> {
  private todoService!: TodoService;

  constructor() {
    super(dayRepository);
  }

  public initialize(todoService: TodoService) {
    this.todoService = todoService;
  }

  public async getOneOrCreate(id: string) {
    try {
      return await super.getOne(id);
    } catch {
      return await super.create({ id });
    }
  }

  public entityToType(entity: DayEntity): Day {
    return {
      id: entity.id,
      todos: entity.todos?.map((todo) => this.todoService.entityToType(todo)),
    };
  }
}

export default DayService;
