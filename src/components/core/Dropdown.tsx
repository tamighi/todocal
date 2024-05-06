import { ListRenderItemInfo, Pressable, ViewStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Card, Text, Box } from "@/atoms";
import { useClickOutside } from "@/hooks";

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
  containerStyle?: ViewStyle;
};

export const Dropdown = <T extends object | string>(props: Props<T>) => {
  const {
    values = [],
    open = false,
    renderItem: renderItemProp,
    onItemClick,
    labelKey,
    onClose,
    containerStyle,
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
        <Pressable key={index} onPress={() => onItemClick?.(item)}>
          {renderItemProp ? (
            renderItemProp(item, index, values)
          ) : (
            <Box
              borderColor="mainForeground"
              borderBottomWidth={values.length === index + 1 ? 0 : 1}
              p="s"
            >
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
          variant="elevated"
          left={0}
          maxHeight={200}
          ref={ref}
          borderWidth={1}
          borderColor="mainForeground"
          style={containerStyle}
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
