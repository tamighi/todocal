import { dayRepository } from "@/data/repositories";
import { DayEntity } from "@/data/local";
import { Day } from "@/models";

import AbstractService from "./AbstractService";
import MonthService from "./MonthService";
import TodoService from "./TodoService";

class DayService extends AbstractService<DayEntity, Day> {
  private monthService!: MonthService;
  private todoService!: TodoService;

  constructor() {
    super(dayRepository);
  }

  public async getOneOrCreate(dayId: string) {
    try {
      const entity = await this.getOne(dayId);
      return entity;
    } catch (_) {
      return this.create({ id: dayId });
    }
  }

  public initialize(monthService: MonthService, todoService: TodoService) {
    this.monthService = monthService;
    this.todoService = todoService;
  }

  public entityToType(entity: DayEntity): Day {
    return {
      id: entity.id,
      month: entity.month
        ? this.monthService.entityToType(entity.month)
        : undefined,
      todos: entity.todos?.map((todo) => this.todoService.entityToType(todo)),
    };
  }
}

export default DayService;
