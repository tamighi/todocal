import { Entity, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { TodoEntity } from "./todo.entity";
import { MonthEntity } from "./month.entity";

@Entity("day")
export class DayEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => TodoEntity, (todo) => todo.day)
  todos?: TodoEntity[];

  @ManyToOne(() => MonthEntity, (month) => month.days)
  month?: MonthEntity;
}
