import React from "react";

import { Month } from "@/models";
import { MonthService } from "@/services";

const useMonth = (monthId: string) => {
  const [month, setMonth] = React.useState<Month>();

  React.useEffect(() => {
    const fetchMonth = async () => {
      const month = await MonthService.getOne(monthId);
      setMonth(month);
    };

    fetchMonth();
  }, []);

  return { month };
};

export default useMonth;
