import React from "react";

import { TextStyle, ViewStyle } from "react-native";
import Fuse from "fuse.js";

import { Box } from "@/atoms";

import { Dropdown } from "./Dropdown";
import { TextInput } from "../TextInput";
import { PropertyKey, getProperty } from "./utils";

type Props<T extends object | string> = {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  value?: T;
  onChange?: (newValue: T | null) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  data?: T[];
  labelKey?: PropertyKey<T>;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
};

export const Autocomplete = <T extends object | string>(props: Props<T>) => {
  const {
    value,
    onChange,
    onInputChange,
    containerStyle,
    inputStyle,
    placeholder,
    data = [],
    labelKey,
    renderItem,
  } = props;

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState(
    value ? getProperty(value, labelKey) : "",
  );

  const handleValuePress = (newVal: T) => {
    setSelectOpen(false);
    setCurrentInput(getProperty(newVal, labelKey));
    onChange?.(newVal);
  };

  const handleInputPress = () => {
    setSelectOpen(true);
  };

  // Filter values
  React.useEffect(() => {
    if (value) setCurrentInput(getProperty(value, labelKey));
  }, [value]);

  const contains = (searchTerm: string, values: T[]) => {
    if (searchTerm === "") return values;

    const keys = labelKey ? ([labelKey] as string[]) : undefined;
    const fuse = new Fuse(values, { keys });
    return fuse.search(searchTerm).map((i) => i.item);
  };

  const [filteredValues, setFilteredValues] = React.useState(data);

  React.useEffect(() => {
    setFilteredValues(contains(currentInput, data));
  }, [data, currentInput]);

  const handleChangeText = (value: string) => {
    setSelectOpen(true);
    setCurrentInput(value);
    onInputChange?.(value);
  };

  return (
    <Box style={containerStyle} zIndex={2}>
      <TextInput
        onPressIn={handleInputPress}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        value={currentInput}
        style={inputStyle}
        showClearButton={true}
      />
      <Dropdown
        values={filteredValues}
        renderItem={renderItem}
        labelKey={labelKey}
        open={selectOpen}
        onItemClick={handleValuePress}
        onClose={() => setSelectOpen(false)}
      />
    </Box>
  );
};
