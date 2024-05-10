import React from "react";

import { ListRenderItemInfo, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Text, Box, BoxProps } from "@/atoms";
import { PropertyKey, getProperty } from "./utils";
import { useClickOutside } from "@/hooks";

type Props<T> = {
  values?: T[];
  onItemClick?: (value: T) => void;
  open?: boolean;
  onClose?: () => void;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
  labelKey?: PropertyKey<T>;
} & BoxProps;

export const Dropdown = <T extends object | string>(props: Props<T>) => {
  const {
    values = [],
    open = false,
    renderItem: renderItemProp,
    onItemClick,
    labelKey,
    onClose,
    ...rest
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
          {...rest}
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
