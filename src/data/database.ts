import { DataSource } from "typeorm";
import { DayEntity, MonthEntity, TodoEntity } from "./local";
import { dayRepository, monthRepository, todoRepository } from "./repositories";

const source = new DataSource({
  database: "tasks.db",
  type: "expo",
  driver: require("expo-sqlite"),
  entities: [TodoEntity, DayEntity, MonthEntity],
  synchronize: true,
});

const repositories = [dayRepository, monthRepository, todoRepository];

export class Database {
  public static AppDataSource: DataSource;

  static async init() {
    if (this.AppDataSource?.isInitialized) return;

    Database.AppDataSource = source;
    await Database.AppDataSource.initialize();
    repositories.forEach((repository) => repository.init());
  }
}
