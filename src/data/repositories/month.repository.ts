import { MonthEntity } from "../local/month.entity";
import { AbstractRepository } from "./abstract.repository";

class MonthRepository extends AbstractRepository<MonthEntity> {
  constructor() {
    super(MonthEntity, { relations: { days: true } });
  }
}

export default MonthRepository;
