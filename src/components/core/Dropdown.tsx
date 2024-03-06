import { Pressable } from "react-native";

import { Card, Text, Box } from "@/atoms";
import { useClickOutside } from "@/hooks";

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
    renderItem,
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

  return (
    <Card
      top="100%"
      ref={ref}
      left={0}
      right={0}
      zIndex={100}
      position="absolute"
      visible={open}
      borderWidth={1}
      margin="xxs"
    >
      {values.map((v, k) => {
        return (
          <Pressable key={k} onPress={() => onValueChange?.(v)}>
            {renderItem ? (
              renderItem(v, k, values)
            ) : (
              <Box borderBottomWidth={values.length === k + 1 ? 0 : 1}>
                <Text>{getLabel(v)}</Text>
              </Box>
            )}
          </Pressable>
        );
      })}
    </Card>
  );
};
