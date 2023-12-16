import { MonthRepository } from "@/data/repositories";
import { Month } from "@/models";
import { MonthEntity } from "@/data/local";

import AbstractService from "./AbstractService";
import DayService from "./DayService";

// Repository to use in constructor
const monthRepository = new MonthRepository();

class MonthService extends AbstractService<MonthEntity, Month> {
  constructor() {
    super(monthRepository);
  }

  public entityToType(entity: MonthEntity): Month {
    return {
      id: entity.id,
      days: entity.days?.map((day) => DayService.entityToType(day)),
    };
  }
}

export default new MonthService();
