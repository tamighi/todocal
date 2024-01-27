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

  @Column("float", { unique: true })
  order: number;

  @Column("boolean", { default: false })
  urgent: boolean;

  @Column("boolean", { default: false })
  important: boolean;

  @ManyToOne("day", "todos")
  day?: DayEntity;

  @ManyToOne("tag", "todos", { nullable: true, onDelete: "SET NULL" })
  tag?: TagEntity | null;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
