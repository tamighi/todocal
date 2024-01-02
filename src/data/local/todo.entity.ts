import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import type { DayEntity } from "./day.entity";
import type { TagEntity } from "./tag.entity";

@Entity("todo")
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  content: string;

  @Column("boolean", { default: false })
  done: boolean;

  @Column("float")
  order: number;

  @ManyToOne("day", "todos")
  day?: DayEntity;

  @ManyToOne("tag", "todos")
  tag?: TagEntity;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
