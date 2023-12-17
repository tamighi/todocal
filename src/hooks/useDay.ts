import React from "react";

import { Day } from "@/models";
import { dayService } from "@/services";

const useDay = (dayId: string) => {
  const [day, setDay] = React.useState<Day>();

  React.useEffect(() => {
    const fetchDay = async () => {
      const day = await dayService.getOneOrCreate(dayId);
      setDay(day);
    };

    fetchDay();
  }, [dayId]);

  return { day };
};

export default useDay;
