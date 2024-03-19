import { DataSource } from "typeorm";
import { Platform } from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import { dayRepository, tagRepository, todoRepository } from "./repositories";
import { DayEntity, TagEntity, TodoEntity } from "./entities";

const repositories = [dayRepository, todoRepository, tagRepository];

// TODO: DB name in env
const source = new DataSource({
  database: "tasks.db",
  type: "expo",
  driver: require("expo-sqlite"),
  entities: [TodoEntity, DayEntity, TagEntity],
  synchronize: true,
});

export class Database {
  public static AppDataSource: DataSource;

  static async init() {
    if (this.AppDataSource?.isInitialized) return;

    Database.AppDataSource = source;
    await Database.AppDataSource.initialize();
    repositories.forEach((repository) => repository.init());
  }

  static async export() {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + "SQLite/tasks.db",
          {
            encoding: FileSystem.EncodingType.Base64,
          },
        );

        const uri = await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "tasks.db",
          "application/octet-stream",
        );
        await FileSystem.writeAsStringAsync(uri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }
    } else {
      await Sharing.shareAsync(
        FileSystem.documentDirectory + "SQLite/tasks.db",
      );
    }
  }

  static async import() {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (!result.assets) return;
    const file = result.assets[0];

    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite",
      );
    }

    const base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "SQLite/tasks.db",
      base64,
      { encoding: FileSystem.EncodingType.Base64 },
    );

    await Database.AppDataSource.destroy();
    await this.init();
  }
}
