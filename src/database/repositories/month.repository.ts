import { MonthEntity } from "../entities";
import { AbstractRepository } from "./abstract.repository";

class MonthRepository extends AbstractRepository<MonthEntity> {
  constructor() {
    super(MonthEntity, {
      relations: { days: { todos: { tag: true } } },
      order: { days: { todos: { order: "ASC" } } },
    });
  }
}

export default MonthRepository;
