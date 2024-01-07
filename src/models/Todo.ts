import type Day from "./Day";
import type Tag from "./Tag";

export default interface Todo {
  id: string;
  content: string;
  done: boolean;
  order: number;
  urgent: boolean;
  important: boolean;
  day?: Day;
  tag?: Tag;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoMutate = Omit<Partial<Todo>, "tag"> & {
  tag?: Tag | { id: null };
};
