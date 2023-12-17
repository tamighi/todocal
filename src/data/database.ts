import { DataSource } from "typeorm";
import { DayEntity, MonthEntity, TodoEntity } from "./local";

const source = new DataSource({
  database: "tasks.db",
  type: "expo",
  driver: require("expo-sqlite"),
  entities: [TodoEntity, DayEntity, MonthEntity],
  synchronize: true,
});

export class Database {
  public static AppDataSource: DataSource;

  static async init() {
    if (this.AppDataSource?.isInitialized) return;

    Database.AppDataSource = source;
    await Database.AppDataSource.initialize();
  }
}
