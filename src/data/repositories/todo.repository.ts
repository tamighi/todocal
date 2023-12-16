import { TodoEntity } from "../local/todo.entity";
import { AbstractRepository } from "./abstract.repository";

export class TodoRepository extends AbstractRepository<TodoEntity> {
  constructor() {
    super(TodoEntity, { relations: { day: true } });
  }
}
