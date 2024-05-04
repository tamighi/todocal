import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { Box, Text } from "@/atoms";
import { Tag } from "@/models";
import { BottomSheet, IconButton, MutateTagForm } from "@/components";
import { RootStackParamList } from "@/Navs";

import { TagList } from "./TagList";
import { SafeAreaView } from "../BaseScreen";
import { UndoToastProvider } from "@/providers";

type Props = NativeStackScreenProps<RootStackParamList, "TagList">;

export const TagListModal = ({ navigation }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = React.useState<Tag>();

  const onTagPress = (tag?: Tag) => {
    setOpen(true);
    setTag(tag);
  };

  return (
    <UndoToastProvider>
      <SafeAreaView px="s" bg="mainBackground" justifyContent="space-between">
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
      </SafeAreaView>
    </UndoToastProvider>
  );
};
