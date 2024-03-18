import {
  Database,
  dayRepository,
  tagRepository,
  todoRepository,
} from "@/database";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";

const repositories = [dayRepository, todoRepository, tagRepository];

export const exportDB = async () => {
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
    await Sharing.shareAsync(FileSystem.documentDirectory + "SQLite/tasks.db");
  }
};

export const importDB = async () => {
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
  await initDB();
};

export const initDB = async () => {
  await Database.init();
  repositories.forEach((repository) => repository.init());
};
