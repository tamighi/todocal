import React from "react";

import { Box } from "@/atoms";
import { TextStyle, ViewStyle } from "react-native";
import { Dropdown } from "./Dropdown";
import { Button } from "../Button";

type StringKey<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

type Props<T extends object | string> = {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  value?: T;
  onChange?: (newValue: T | null) => void;
  placeholder?: string;
  data?: T[];
  labelKey?: T extends object ? StringKey<T> : never;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
};

export const Select = <T extends object | string>(props: Props<T>) => {
  const {
    value,
    onChange,
    containerStyle,
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
    value ? getLabel(value) : null,
  );

  const handleValuePress = (newVal: T) => {
    setSelectOpen(false);
    setCurrentInput(getLabel(newVal));
    onChange?.(newVal);
  };

  const handleButtonPress = () => {
    setSelectOpen(true);
  };

  // Filter values
  React.useEffect(() => {
    if (value) setCurrentInput(getLabel(value));
  }, [value]);

  return (
    <Box style={containerStyle} zIndex={2}>
      <Button
        variant="outlined"
        onPress={handleButtonPress}
        label={currentInput ?? placeholder}
      />
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
