import type Todo from "./Todo";

export default interface Tag {
  id: string;
  name: string;
  color: string;
  todos?: Todo[];
}
