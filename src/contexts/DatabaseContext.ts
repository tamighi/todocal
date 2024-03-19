import React from "react";

export interface IDatabaseContext {
  exportDb: () => void;
  importDb: () => void;
}

export const useDatabase = () => {
  const dbContext = React.useContext(DatabaseContext);
  if (!dbContext) throw new Error("Database context must be defined.");

  return dbContext;
};

export const DatabaseContext = React.createContext<IDatabaseContext | null>(
  null,
);
