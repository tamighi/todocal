import React from "react";

import { Text } from "@/atoms";
import { Database } from "./local";
import { dayRepository, monthRepository, todoRepository } from "./repositories";

const repositories = [dayRepository, monthRepository, todoRepository];

export const DatabaseLoader = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const initDatabase = async () => {
      await Database.init();
      repositories.forEach((repository) => repository.init());
      setLoaded(true);
    };

    initDatabase();
  }, []);

  return <>{loaded ? children : <Text>Loading</Text>}</>;
};
