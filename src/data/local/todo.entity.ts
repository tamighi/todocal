import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
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

  @ManyToMany("tag", "todos")
  @JoinTable()
  tags?: TagEntity[];

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
