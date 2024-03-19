import React from "react";

import { Text } from "@/atoms";
import { Database } from "./database";

export const DatabaseLoader = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const initDatabase = async () => {
      await Database.init();

      setLoaded(true);
    };

    initDatabase();
  }, []);

  return <>{loaded ? children : <Text>Loading</Text>}</>;
};
