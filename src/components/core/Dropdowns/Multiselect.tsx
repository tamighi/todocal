import React from "react";

import { Box, Text } from "@/atoms";
import { Pressable, TextStyle, ViewStyle } from "react-native";
import { Dropdown } from "./Dropdown";
import { LabelKey, getLabel } from "./utils";

type Props<T extends object | string> = {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  values?: T[];
  onChange?: (newValue: T | null) => void;
  placeholder?: string;
  data?: T[];
  labelKey?: LabelKey<T>;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
};

export const Multiselect = <T extends object | string>(props: Props<T>) => {
  const {
    values,
    onChange,
    containerStyle,
    placeholder,
    data = [],
    labelKey,
    renderItem,
  } = props;

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState(
    values ? values.map((value) => getLabel(value, labelKey)) : [],
  );

  const handleValuePress = (newVal: T) => {
    setSelectOpen(false);
    setCurrentInput((prev) => [...prev, getLabel(newVal, labelKey)]);
    onChange?.(newVal);
  };

  const handleSelectPress = () => {
    setSelectOpen(true);
  };

  // Filter values
  React.useEffect(() => {
    if (values)
      setCurrentInput(values.map((value) => getLabel(value, labelKey)));
  }, [values]);

  return (
    <Box style={containerStyle} zIndex={2}>
      <Pressable onPress={handleSelectPress}>
        <Box>
          {!!placeholder && currentInput.length === 0 ? (
            <Text>{placeholder}</Text>
          ) : null}
          {currentInput.map((value) => {
            return <Text>{value}</Text>;
          })}
        </Box>
      </Pressable>
      <Dropdown
        values={data}
        renderItem={renderItem}
        labelKey={labelKey}
        open={selectOpen}
        onItemClick={handleValuePress}
        onClose={() => setSelectOpen(false)}
      />
    </Box>
  );
};
