import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { DayEntity } from "./day-entity";

@Entity("todo")
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @Column("boolean", { default: false })
  done: boolean;

  @ManyToOne(() => DayEntity, (day) => day.todos)
  day: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
