import { Day, Todo } from "@/models";

import TODO_FIXTURES from "./TODO_FIXTURES";

const groupedTodos = TODO_FIXTURES.reduce(
  (acc: Record<string, Todo[]>, todo) => {
    const { dayId, ...rest } = todo;

    if (!acc[dayId]) {
      acc[dayId] = [];
    }

    acc[dayId].push({ ...rest, dayId });
    return acc;
  },
  {},
);

const DAY_FIXTURES: Day[] = Object.entries(groupedTodos).map(
  ([dayId, todos]) => ({
    id: dayId,
    todos,
  }),
);

export default DAY_FIXTURES;
