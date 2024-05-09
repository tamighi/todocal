import { DeepPartial } from "typeorm";
import { TodoEntity } from "../entities";
import { AbstractRepository } from "./abstract.repository";

class TodoRepository extends AbstractRepository<TodoEntity> {
  constructor() {
    super(TodoEntity, {
      relations: { day: true, tag: true },
      order: { order: "ASC" },
    });
  }

  public async getByDay(dayId: string) {
    return this.getList({ where: { day: { id: dayId } } });
  }

  public override async create(payload: DeepPartial<TodoEntity>) {
    const order = await this.getNextOrder();
    const payloadWithOrder = {
      ...payload,
      order,
    };

    return super.create(payloadWithOrder);
  }

  public async getTodosWithRepetitionOnDate(date: Date): Promise<TodoEntity[]> {
    const todos = await this.repository
      .createQueryBuilder("todo")
      .innerJoin("todo.repetition", "repetition")
      .where(
        `(repetition.type = :daily 
          AND repetition.startDay <= :date 
          AND DATE_DIFF(:date, repetition.startDay) % repetition.interval = 0
          ) OR (repetition.type = :weekly AND repetition.dayOfWeek = :dayOfWeek)`,
        {
          date: date.toISOString().split("T")[0],
          dayOfWeek: date.getDay(),
          daily: "daily",
          weekly: "weekly",
        },
      )
      .getMany();

    return todos;
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
