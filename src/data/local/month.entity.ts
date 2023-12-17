import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Day } from "@/models";

@Entity("month")
export class MonthEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany("day", "month")
  days?: Day[];
}
