import { Entity, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { Month, Todo } from "@/models";

@Entity("day")
export class DayEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany("todo", "day")
  todos?: Todo[];

  @ManyToOne("month", "days")
  month?: Month;
}
