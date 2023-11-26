import { Day, Month } from "@/models";

import DAY_FIXTURES from "./DAY_FIXTURES";

const groupedDays = DAY_FIXTURES.reduce((acc: Record<string, Day[]>, day) => {
  const { id, ...rest } = day;
  // Extract the monthId from the dayId, assuming the dayId is in the format "monthId-dayNumber"
  const monthId = id.split("-").slice(0, 2).join("-");

  if (!acc[monthId]) {
    acc[monthId] = [];
  }

  acc[monthId].push({ ...rest, id });
  return acc;
}, {});

const MONTH_FIXTURES: Month[] = Object.entries(groupedDays).map(
  ([monthId, days]) => ({
    id: monthId,
    days,
  }),
);

export default MONTH_FIXTURES;
