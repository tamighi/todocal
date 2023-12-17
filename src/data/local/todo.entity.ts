import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import type { Day } from "@/models";

@Entity("todo")
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  content: string;

  @Column("boolean", { default: false })
  done: boolean;

  @ManyToOne("day", "todos")
  day?: Day;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
