import type Todo from "./Todo";

export default interface Day {
  id: string;
  todos?: Todo[];
}
