import React from "react";

import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Box, Container, Text } from "@/atoms";
import { Tag } from "@/models";

import { TagList } from "./TagList";
import { BottomSheet, IconButton } from "../core";
import { MutateTagForm } from "./MutateTagForm";

type Props = DrawerContentComponentProps;

export const TagListModal = ({ navigation }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = React.useState<Tag>();

  const insets = useSafeAreaInsets();

  const onTagPress = (tag?: Tag) => {
    setOpen(true);
    setTag(tag);
  };

  return (
    <Container
      style={{
        paddingBottom:
          Platform.OS === "android" ? insets.bottom + 24 : insets.bottom,
        paddingTop: insets.top,
      }}
      px="s"
      bg="mainBackground"
      justifyContent="space-between"
    >
      <Box>
        <Box
          pl="s"
          mb="s"
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          borderBottomColor="mainForeground"
          borderBottomWidth={1}
        >
          <Box flexDirection="row" g="s" alignItems="center">
            <Feather color="white" size={20} name="tag" />
            <Text fontWeight="bold">Tags</Text>
          </Box>
          <IconButton
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer)}
            name="x"
          />
        </Box>
        <TagList onTagPress={onTagPress} />
      </Box>
      <Box alignItems="flex-end">
        <IconButton onPress={() => onTagPress()} name="plus" />
      </Box>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={[320]}
      >
        <MutateTagForm tag={tag} onMutate={() => setOpen(false)} />
      </BottomSheet>
    </Container>
  );
};
