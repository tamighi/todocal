import { DataSource } from "typeorm";
import { TodoEntity } from "./todo-entity";
import { DayEntity } from "./day-entity";
import { MonthEntity } from "./month-entity";

const source = new DataSource({
  database: "tasks.db",
  type: "expo",
  driver: require("expo-sqlite"),
  entities: [TodoEntity, DayEntity, MonthEntity],
  synchronize: true,
});

export class Database {
  public static AppDataSource: DataSource;

  static init() {
    Database.AppDataSource = source;
    Database.AppDataSource.initialize().then(() => {
      console.log("TYPEORM initialized");
    });
  }
}
