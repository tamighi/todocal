import { source } from "./local/database";
import { TodoEntity } from "./local/todo-entity";

export class TodosRepository {
  async getTodos(): Promise<TodoEntity[]> {
    if (!source.isInitialized) await source.initialize();

    const todos = await TodoEntity.find();

    return todos;
  }

  async getTodo(todoId: TodoEntity["id"]): Promise<TodoEntity> {
    if (!source.isInitialized) await source.initialize();

    const todo = await TodoEntity.findOneByOrFail({ id: todoId });
    return todo;
  }

  async createTodo(payload: Pick<TodoEntity, "content">) {
    if (!source.isInitialized) await source.initialize();

    const todo = new TodoEntity();
    todo.content = payload.content;
    await todo.save();
  }

  async updateTodo(
    todoId: TodoEntity["id"],
    payload: Partial<Pick<TodoEntity, "content" | "done">>,
  ) {
    if (!source.isInitialized) await source.initialize();

    const todo = await TodoEntity.findOneByOrFail({ id: todoId });
    todo.content = payload.content ?? todo.content;
    todo.done = payload.done ?? todo.done;
    await todo.save();
  }

  async deleteTodo(todoId: TodoEntity["id"]) {
    if (!source.isInitialized) await source.initialize();

    await TodoEntity.delete(todoId);
  }
}
