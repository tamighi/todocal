import { DayEntity, DayRepository, dayRepository } from "@/database";
import { Day } from "@/models";

import AbstractService from "./AbstractService";

class DayService extends AbstractService<DayEntity, Day, DayRepository> {
  constructor() {
    super(dayRepository);
  }

  public async getOneOrCreate(id: string) {
    try {
      return await super.getOne(id);
    } catch {
      return await super.create({ id });
    }
  }

  public entityToType(entity: DayEntity): Day {
    return entity;
  }

  public typeToEntity(obj: Day): DayEntity {
    return obj;
  }
}

export default DayService;
