import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { DayEntity } from "./day.entity";

@Entity("todo")
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  content: string;

  @Column("boolean", { default: false })
  done: boolean;

  @ManyToOne(() => DayEntity, (day) => day.todos)
  day?: DayEntity;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
