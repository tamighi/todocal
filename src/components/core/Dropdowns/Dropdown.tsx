import React from "react";

import { ListRenderItemInfo, Pressable, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FullWindowOverlay } from "react-native-screens";

import { Text, Box } from "@/atoms";
import { getProperty } from "./utils";
import { useClickOutside } from "@/hooks";
import { Portal } from "@gorhom/portal";

type StringKey<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

type Props<T> = {
  values?: T[];
  onItemClick?: (value: T) => void;
  open?: boolean;
  onClose?: () => void;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
  labelKey?: T extends object ? StringKey<T> : never;
};

export const Dropdown = <T extends object | string>(props: Props<T>) => {
  const {
    values = [],
    open = false,
    renderItem: renderItemProp,
    onItemClick,
    labelKey,
    onClose,
  } = props;
  const ref = useClickOutside(() => onClose?.());

  const renderItem = ({ index, item }: ListRenderItemInfo<T>) => {
    {
      return (
        <Pressable key={index} onPress={() => onItemClick?.(item)}>
          {renderItemProp ? (
            renderItemProp(item, index, values)
          ) : (
            <Box
              borderColor="mainForeground"
              borderBottomWidth={values.length === index + 1 ? 0 : 1}
              p="s"
            >
              <Text>{getProperty(item, labelKey)}</Text>
            </Box>
          )}
        </Pressable>
      );
    }
  };

  return (
    <>
      {open && (
        <Box
          ref={ref}
          top="100%"
          position="absolute"
          backgroundColor="secondaryBackground"
        >
          <FlatList
            keyboardShouldPersistTaps="always"
            renderItem={renderItem}
            data={values}
          />
        </Box>
      )}
    </>
  );
};
