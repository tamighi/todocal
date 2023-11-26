import React from "react";

import { Day } from "@/models";
import { DayService } from "@/services";

const useDay = (dayId: string) => {
  const [day, setDay] = React.useState<Day>();

  React.useEffect(() => {
    const fetchDay = async () => {
      const day = await DayService.getOne(dayId);
      setDay(day);
    };

    fetchDay();
  }, [dayId]);

  return { day };
};

export default useDay;
