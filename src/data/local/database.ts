import { DataSource } from "typeorm";
import { TodoEntity } from "./todo-entity";

export const source = new DataSource({
  database: "tasks.db",
  type: "expo",
  driver: require("expo-sqlite"),
  entities: [TodoEntity],
  synchronize: true,
});
