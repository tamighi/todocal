import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import type { TodoEntity } from "./todo.entity";

@Entity("day")
export class DayEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany("todo", "day")
  todos?: TodoEntity[];
}
