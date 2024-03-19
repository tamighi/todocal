import React from "react";

export interface IDatabaseContext {
  export: () => void;
  import: () => void;
  loading: boolean;
}

export const useDatabase = () => {
  const dbContext = React.useContext(DatabaseContext);
  if (!dbContext) throw new Error("Database context must be defined.");

  return dbContext;
};

export const DatabaseContext = React.createContext<IDatabaseContext | null>(
  null,
);
