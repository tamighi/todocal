import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import type { TodoEntity } from "./todo.entity";

@Entity("tag")
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  color: string;

  @OneToMany("todo", "tag")
  todos?: TodoEntity[];
}
