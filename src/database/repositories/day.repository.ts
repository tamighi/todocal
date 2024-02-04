import { DayEntity } from "../entities";
import { AbstractRepository } from "./abstract.repository";

class DayRepository extends AbstractRepository<DayEntity> {
  constructor() {
    super(DayEntity, {
      relations: { todos: { tag: true } },
    });
  }
}

export default DayRepository;
