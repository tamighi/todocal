import React from "react";

import { TextStyle, ViewStyle } from "react-native";

import { Box } from "@/atoms";
import { Dropdown } from "./Dropdown";
import { TextInput } from "./TextInput";

type StringKey<T> = {
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
  labelKey?: T extends object ? StringKey<T> : never;
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
    labelKey,
    renderItem,
  } = props;

  const getLabel = (value: T): string => {
    if (!value || (labelKey && !value[labelKey])) return "";
    return labelKey ? (value[labelKey] as string) : (value as string);
  };

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);

  const [currentInput, setCurrentInput] = React.useState(
    value ? getLabel(value) : "",
  );

  const handleValuePress = (newVal: T) => {
    setSelectOpen(false);
    setCurrentInput(getLabel(newVal));
    onChange?.(newVal);
  };

  const handleInputPress = () => {
    setSelectOpen(!selectOpen);
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
    setSelectOpen(true);
    setCurrentInput(value);
    onInputChange?.(value);
  };

  return (
    <Box style={containerStyle} zIndex={10}>
      <TextInput
        onPressIn={handleInputPress}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        value={currentInput}
        style={inputStyle}
      />
      <Dropdown
        values={filteredValues}
        renderItem={renderItem}
        labelKey={labelKey}
        open={selectOpen}
        onValueChange={handleValuePress}
        onClose={() => setSelectOpen(false)}
      />
    </Box>
  );
};
