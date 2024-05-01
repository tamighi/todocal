import { Box, Text } from "@/atoms";
import { TagList } from "./TagList";
import { IconButton } from "../core";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

type Props = DrawerContentComponentProps;

export const TagListModal = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      style={{
        paddingBottom:
          Platform.OS === "android" ? insets.bottom + 24 : insets.bottom,
        paddingTop: insets.top,
      }}
      px="s"
      flex={1}
      bg="mainBackground"
    >
      <Box
        pl="s"
        mb="s"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
        borderBottomColor="mainForeground"
        borderBottomWidth={1}
      >
        <Text fontWeight="bold">Todocal</Text>
        <IconButton
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer)}
          name="x"
        />
      </Box>
      <TagList />
    </Box>
  );
};
