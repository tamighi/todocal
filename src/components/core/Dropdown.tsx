import { ListRenderItem, ListRenderItemInfo, Pressable } from "react-native";
import { Portal } from "@gorhom/portal";

import { Card, Text, Box } from "@/atoms";
import { useClickOutside } from "@/hooks";
import { FlatList } from "react-native-gesture-handler";

type StringKey<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

type Props<T> = {
  values?: T[];
  onValueChange?: (value: T) => void;
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
    onValueChange,
    labelKey,
    onClose,
  } = props;

  const getLabel = (value: T): string => {
    if (!value || (labelKey && !value[labelKey])) return "";
    return labelKey ? (value[labelKey] as string) : (value as string);
  };

  const handleClickOutside = () => {
    onClose?.();
  };

  const ref = useClickOutside(handleClickOutside);

  const renderItem = ({ index, item }: ListRenderItemInfo<T>) => {
    {
      return (
        <Pressable key={index} onPress={() => onValueChange?.(item)}>
          {renderItemProp ? (
            renderItemProp(item, index, values)
          ) : (
            <Box borderBottomWidth={values.length === index + 1 ? 0 : 1}>
              <Text>{getLabel(item)}</Text>
            </Box>
          )}
        </Pressable>
      );
    }
  };

  return (
    <>
      {open && (
        <Card
          position="absolute"
          top="100%"
          left={0}
          maxHeight={200}
          width="50%"
          zIndex={1000}
          ref={ref}
          borderWidth={1}
        >
          <FlatList
            keyboardShouldPersistTaps="always"
            renderItem={renderItem}
            data={values}
          />
        </Card>
      )}
    </>
  );
};
