import type Day from "./Day";

export default interface Todo {
  id: string;
  content: string;
  done: boolean;
  day?: Day;
  createdAt: Date;
  updatedAt: Date;
}
