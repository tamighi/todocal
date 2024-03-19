import React from "react";

import { Text } from "@/atoms";
import { Database } from "@/database";
import { DatabaseContext } from "@/contexts";
import { useQueryClient } from "@tanstack/react-query";

export const DatabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = React.useState(true);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const initDatabase = async () => {
      await Database.init();

      setLoading(false);
    };

    initDatabase();
  }, []);

  const exportDb = async () => {
    return Database.export();
  };

  const importDb = async () => {
    setLoading(true);
    await Database.import();
    queryClient.invalidateQueries();
    setLoading(false);
  };

  return (
    <DatabaseContext.Provider value={{ exportDb, importDb }}>
      {!loading ? children : <Text>Loading</Text>}
    </DatabaseContext.Provider>
  );
};
