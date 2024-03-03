import React from "react";

import { Pressable, TextStyle, ViewStyle } from "react-native";

import { Box, Card, Text } from "@/atoms";
import { useClickOutside } from "@/hooks";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

type FieldType<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

type Props<T extends object | string> = {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  value?: T;
  onChange?: (newValue: T | null) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  data?: T[];
  labelField?: T extends object ? FieldType<T> : never;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
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
    renderItem,
  } = props;

  const getLabel = (value: T): string => {
    if (!value || (labelField && !value[labelField])) return "";
    return labelField ? (value[labelField] as string) : (value as string);
  };

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);

  const [currentInput, setCurrentInput] = React.useState(
    value ? getLabel(value) : "",
  );

  const handleClickOutside = () => {
    setSelectOpen(false);
  };

  const handleValuePress = (newVal: T) => {
    setSelectOpen(false);
    setCurrentInput(getLabel(newVal));
    onChange?.(newVal);
  };

  const ref = useClickOutside(handleClickOutside);

  const handleInputPress = () => {
    setSelectOpen(true);
  };

  // Filter values
  React.useEffect(() => {
    if (value) setCurrentInput(getLabel(value));
  }, [value]);

  const contains = (searchTerm: string, values: T[]) => {
    return values.filter((value) => {
      const searchTermArr = searchTerm.toLowerCase().trim().split("");
      let valueIndex = 0;
      const valueLabel = getLabel(value).toLowerCase();

      for (const letter of searchTermArr) {
        valueIndex = valueLabel.indexOf(letter.toLowerCase(), valueIndex);
        if (valueIndex === -1) return false;
        valueIndex += 1;
      }
      return true;
    });
  };

  const [filteredValues, setFilteredValues] = React.useState(data);

  React.useEffect(() => {
    setFilteredValues(contains(currentInput, data));
  }, [data, currentInput]);

  const handleChangeText = (value: string) => {
    setCurrentInput(value);
    onInputChange?.(value);
  };

  return (
    <Box position="relative" style={containerStyle}>
      <BottomSheetTextInput
        onPressIn={handleInputPress}
        style={{ borderWidth: 1, ...inputStyle }}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        value={currentInput}
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
        margin="xxs"
      >
        {filteredValues?.map((v, k) => {
          return (
            <Pressable key={k} onPress={() => handleValuePress(v)}>
              {renderItem ? (
                renderItem(v, k, filteredValues)
              ) : (
                <Box
                  borderBottomWidth={filteredValues.length === k + 1 ? 0 : 1}
                >
                  <Text>{getLabel(v)}</Text>
                </Box>
              )}
            </Pressable>
          );
        })}
      </Card>
    </Box>
  );
};
