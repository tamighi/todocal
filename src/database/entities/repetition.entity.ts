import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity("repetition")
export class RepetitionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne("todo", "repetition")
  todo?: TodoEntity[];
}
