import { FindManyOptions, Repository } from "typeorm";
import { Database } from "./local/database";
import { TodoEntity } from "./local/todo-entity";

export class TodosRepository {
  private repository: Repository<TodoEntity>;

  constructor() {
    this.repository = Database.AppDataSource.getRepository(TodoEntity);
  }

  async getList(options?: FindManyOptions): Promise<TodoEntity[]> {
    const todos = await this.repository.find(options);

    return todos;
  }

  async getOne(todoId: TodoEntity["id"]): Promise<TodoEntity> {
    const todo = await this.repository.findOneByOrFail({ id: todoId });

    return todo;
  }

  async create(payload: Pick<TodoEntity, "content">) {
    const todo = new TodoEntity();

    todo.content = payload.content;

    await todo.save();
  }

  async update(
    todoId: TodoEntity["id"],
    payload: Partial<Pick<TodoEntity, "content" | "done">>,
  ) {
    const todo = await this.repository.findOneByOrFail({ id: todoId });

    todo.content = payload.content ?? todo.content;
    todo.done = payload.done ?? todo.done;

    await this.repository.save(todo);
  }

  async deleteOne(todoId: TodoEntity["id"]) {
    await this.repository.delete(todoId);
  }
}
