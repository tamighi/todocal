import { DeepPartial, IsNull, Not } from "typeorm";
import { TodoEntity } from "../entities";
import { AbstractRepository } from "./abstract.repository";
import { RRule } from "rrule";

class TodoRepository extends AbstractRepository<TodoEntity> {
  constructor() {
    super(TodoEntity, {
      relations: { day: true, tag: true },
      order: { order: "ASC" },
    });
  }

  public async getByDay(dayId: string) {
    const repeatTodo = await this.getByRrule(dayId);
    const uniqueTodos = await this.getList({
      where: { day: { id: dayId }, rRule: IsNull() },
    });

    return [...uniqueTodos, ...repeatTodo];
  }

  private async getByRrule(dayId: string) {
    const reapeatedTodos = await this.getList({
      where: { rRule: Not(IsNull()) },
    });
    const date = new Date(dayId);

    const todos = reapeatedTodos.filter((todo) => {
      const rrule = RRule.fromString(todo.rRule!);
      return rrule.between(date, date, true).length > 0;
    });

    return todos;
  }

  public override async create(payload: DeepPartial<TodoEntity>) {
    const order = await this.getNextOrder();
    const payloadWithOrder = {
      ...payload,
      order,
    };

    return super.create(payloadWithOrder);
  }

  public async getNextOrder() {
    try {
      const [todo] = await this.repository.find({ order: { order: "DESC" } });
      return todo.order + 1;
    } catch {
      return 1;
    }
  }
}

export default TodoRepository;
