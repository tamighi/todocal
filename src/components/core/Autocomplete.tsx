import React from "react";

import {
  Keyboard,
  Pressable,
  TextInput,
  TextStyle,
  ViewStyle,
} from "react-native";

import { Box, Card, Text } from "@/atoms";
import { useClickOutside } from "@/hooks";

type FieldType<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

type Props<T extends object | string> = {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  value?: T;
  onChange?: (newValue: T) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  data?: T[];
  labelField?: T extends object ? FieldType<T> : never;
};

export const Autocomplete = <T extends object | string>(props: Props<T>) => {
  const {
    value,
    onChange,
    onInputChange,
    containerStyle = {},
    inputStyle = {},
    placeholder,
    data = [],
    labelField,
  } = props;

  const getLabel = React.useCallback(
    (value: T): string => {
      return labelField ? (value[labelField] as string) : (value as string);
    },
    [labelField],
  );

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);

  const handleClickOutside = () => {
    setSelectOpen(false);
    Keyboard.dismiss();
  };

  const handleValuePress = (newVal: T) => {
    setSelectOpen(false);
    onChange?.(newVal);
  };

  const ref = useClickOutside(handleClickOutside);

  const handleInputPress = () => {
    setSelectOpen(true);
  };

  return (
    <Box position="relative" style={containerStyle}>
      <TextInput
        onPressIn={handleInputPress}
        style={{ borderWidth: 1, ...inputStyle }}
        placeholder={placeholder}
        onChangeText={onInputChange}
        value={value ? getLabel(value) : undefined}
      />
      <Card
        ref={ref}
        top="100%"
        left={0}
        right={0}
        zIndex={100}
        position="absolute"
        visible={selectOpen}
        borderWidth={1}
      >
        {data?.map((v, k) => {
          return (
            <Pressable key={k} onPress={() => handleValuePress(v)}>
              <Box borderBottomWidth={data.length === k + 1 ? 0 : 1}>
                <Text>{getLabel(v)}</Text>
              </Box>
            </Pressable>
          );
        })}
      </Card>
    </Box>
  );
};