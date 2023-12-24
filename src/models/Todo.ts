import type Day from "./Day";
import type Tag from "./Tag";

export default interface Todo {
  id: string;
  content: string;
  done: boolean;
  order: number;
  day?: Day;
  tags?: Tag[];
  createdAt: Date;
  updatedAt: Date;
}
