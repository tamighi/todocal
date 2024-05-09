import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column({ nullable: true })
  dayOfWeeks?: number[];

  @Column({ default: [] })
  ignoreDays: string[];
}
