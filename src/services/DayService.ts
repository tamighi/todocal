import { DayRepository } from "@/data/repositories";
import { DayEntity } from "@/data/local";
import { Day } from "@/models";

import AbstractService from "./AbstractService";
import MonthService from "./MonthService";
import TodoService from "./TodoService";

// Repository to use in constructor
const dayRepository = new DayRepository();

class DayService extends AbstractService<DayEntity, Day> {
  constructor() {
    super(dayRepository);
  }

  public entityToType(entity: DayEntity): Day {
    return {
      id: entity.id,
      month: entity.month ? MonthService.entityToType(entity.month) : undefined,
      todos: entity.todos?.map((todo) => TodoService.entityToType(todo)),
    };
  }
}

export default new DayService();
