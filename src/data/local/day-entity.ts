import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { TodoEntity } from "./todo-entity";
import { MonthEntity } from "./month-entity";

@Entity("day")
export class DayEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => TodoEntity, (todo) => todo.day)
  todos: TodoEntity[];

  @ManyToOne(() => MonthEntity, (month) => month.days)
  month: MonthEntity;
}
