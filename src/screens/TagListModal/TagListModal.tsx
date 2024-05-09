import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { Box, Text } from "@/atoms";
import { Tag } from "@/models";
import { BottomSheet, IconButton, MutateTagForm } from "@/components";
import { RootStackParamList } from "@/Navs";
import { UndoToastProvider } from "@/providers";

import { TagList } from "./TagList";
import { Platform } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "TagList">;

export const TagListModal = ({ navigation }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = React.useState<Tag>();
  const insets = useSafeAreaInsets();

  const onTagPress = (tag?: Tag) => {
    setOpen(true);
    setTag(tag);
  };

  return (
    <UndoToastProvider>
      <Box
        style={{
          paddingBottom:
            Platform.OS === "android" ? insets.bottom + 24 : insets.bottom,
          paddingTop: Platform.OS === "android" ? insets.top : 0,
        }}
        flex={1}
        backgroundColor="mainBackground"
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
            <IconButton onPress={() => navigation.goBack()} name="x" />
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
      </Box>
    </UndoToastProvider>
  );
};
