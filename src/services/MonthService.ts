import { Month } from "@/models";
import { MonthEntity, monthRepository } from "@/database";

import AbstractService from "./AbstractService";
import DayService from "./DayService";

class MonthService extends AbstractService<MonthEntity, Month> {
  private dayService!: DayService;

  constructor() {
    super(monthRepository);
  }

  public override async getOne(monthId: string) {
    try {
      const entity = await super.getOne(monthId);
      return entity;
    } catch (_) {
      return await this.create({ id: monthId });
    }
  }

  public initialize(dayService: DayService) {
    this.dayService = dayService;
  }

  public entityToType(entity: MonthEntity): Month {
    return {
      id: entity.id,
      days: entity.days?.map((day) => this.dayService.entityToType(day)),
    };
  }
}

export default MonthService;
