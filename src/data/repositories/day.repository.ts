import { DayEntity } from "../local/day.entity";
import { AbstractRepository } from "./abstract.repository";

class DayRepository extends AbstractRepository<DayEntity> {
  constructor() {
    super(DayEntity, { relations: { todos: true, month: true } });
  }
}

export default DayRepository;
