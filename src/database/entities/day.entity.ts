import { Entity, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import type { TodoEntity } from "./todo.entity";
import type { MonthEntity } from "./month.entity";

@Entity("day")
export class DayEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany("todo", "day")
  todos?: TodoEntity[];

  @ManyToOne("month", "days")
  month?: MonthEntity;
}
