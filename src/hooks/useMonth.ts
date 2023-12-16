import React from "react";

import { Month } from "@/models";
import { monthService } from "@/services";

const useMonth = (monthId: string) => {
  const [month, setMonth] = React.useState<Month>();

  React.useEffect(() => {
    const fetchMonth = async () => {
      const month = await monthService.getOneOrCreate(monthId);
      setMonth(month);
    };

    fetchMonth();
  }, [monthId]);

  return { month };
};

export default useMonth;
