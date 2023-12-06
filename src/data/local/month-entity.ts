import { Entity, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";
import { DayEntity } from "./day-entity";

@Entity("month")
export class MonthEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => DayEntity, (day) => day.month)
  days: DayEntity[];
}
