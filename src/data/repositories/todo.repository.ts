import { DeepPartial } from "typeorm";
import { TodoEntity } from "../local/todo.entity";
import { AbstractRepository } from "./abstract.repository";

class TodoRepository extends AbstractRepository<TodoEntity> {
  constructor() {
    super(TodoEntity, { relations: { day: true, tag: true } });
  }

  public override async create(payload: DeepPartial<TodoEntity>) {
    const order = await this.getNextOrder();
    const payloadWithOrder = {
      ...payload,
      order,
    };

    return super.create(payloadWithOrder);
  }

  private async getNextOrder() {
    try {
      const [todo] = await this.repository.find({ order: { order: "DESC" } });
      return todo.order + 1;
    } catch {
      return 1;
    }
  }
}

export default TodoRepository;
