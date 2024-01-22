import { DataSource } from "typeorm";
import { DayEntity, MonthEntity, TagEntity, TodoEntity } from "./entities";

const source = new DataSource({
  database: "tasks.db",
  type: "expo",
  driver: require("expo-sqlite"),
  entities: [TodoEntity, DayEntity, MonthEntity, TagEntity],
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
