import type Day from "./Day";

export default interface Month {
  id: string;
  days?: Day[];
}
