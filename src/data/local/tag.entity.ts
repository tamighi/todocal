import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import type { TodoEntity } from "./todo.entity";

@Entity("tag")
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  color: string;

  @ManyToMany("todo", "tags")
  todos?: TodoEntity[];
}
