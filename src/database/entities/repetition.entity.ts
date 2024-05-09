import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity("repetition")
export class RepetitionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: "weekly" | "daily";

  @OneToOne("todo", "repetition")
  todo: TodoEntity;

  @Column({ nullable: true })
  interval?: number;

  @Column({ nullable: true })
  startDay?: Date;

  @ManyToMany("day")
  ignoreDays: string[];
}
