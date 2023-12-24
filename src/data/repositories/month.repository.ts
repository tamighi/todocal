import { MonthEntity } from "../local/month.entity";
import { AbstractRepository } from "./abstract.repository";

class MonthRepository extends AbstractRepository<MonthEntity> {
  constructor() {
    super(MonthEntity, {
      relations: { days: { todos: true } },
      order: { days: { todos: { order: "ASC" } } },
    });
  }
}

export default MonthRepository;
