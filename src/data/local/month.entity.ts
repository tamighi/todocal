import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { DayEntity } from "./day.entity";

@Entity("month")
export class MonthEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => DayEntity, (day) => day.month)
  days?: DayEntity[];
}
