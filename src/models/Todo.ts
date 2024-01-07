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
  tag?: Tag | null;
  createdAt: Date;
  updatedAt: Date;
}
