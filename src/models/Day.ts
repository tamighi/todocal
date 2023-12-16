import Month from "./Month";
import Todo from "./Todo";

export default interface Day {
  id: string;
  todos?: Todo[];
  month?: Month;
}
