import React from "react";

import { Text } from "@/atoms";
import { initDB } from "@/utils";

export const DatabaseLoader = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const initDatabase = async () => {
      await initDB();

      setLoaded(true);
    };

    initDatabase();
  }, []);

  return <>{loaded ? children : <Text>Loading</Text>}</>;
};
