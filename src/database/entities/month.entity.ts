import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import type { DayEntity } from "./day.entity";

@Entity("month")
export class MonthEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany("day", "month")
  days?: DayEntity[];
}
