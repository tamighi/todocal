import { DayEntity } from "../entities";
import { AbstractRepository } from "./abstract.repository";

class DayRepository extends AbstractRepository<DayEntity> {
  constructor() {
    super(DayEntity, {
      relations: { todos: { tag: true }, month: true },
      order: { todos: { order: "ASC" } },
    });
  }
}

export default DayRepository;