import type Day from "./Day";

export default interface Todo {
  id: string;
  content: string;
  done: boolean;
  order: number;
  day?: Day;
  createdAt: Date;
  updatedAt: Date;
}
