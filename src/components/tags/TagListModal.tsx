import React from "react";

import { Box, Text } from "@/atoms";
import { TagList } from "./TagList";
import { BottomSheet, IconButton } from "../core";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { Tag } from "@/models";
import { MutateTagForm } from "./MutateTagForm";

type Props = DrawerContentComponentProps;

export const TagListModal = ({ navigation }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = React.useState<Tag>();

  const insets = useSafeAreaInsets();

  const onTagPress = (tag: Tag) => {
    setOpen(true);
    setTag(tag);
  };

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
        <Text fontWeight="bold">Tags</Text>
        <IconButton
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer)}
          name="x"
        />
      </Box>
      <TagList onTagPress={onTagPress} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={[320]}
      >
        <MutateTagForm tag={tag} onMutate={() => setOpen(false)} />
      </BottomSheet>
    </Box>
  );
};
