import React from "react";

import { Box } from "@/atoms";
import { TextStyle, ViewStyle } from "react-native";
import { Dropdown } from "./Dropdown";
import { Button } from "../Button";
import { LabelKey, getLabel } from "./utils";

type Props<T extends object | string> = {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  value?: T;
  onChange?: (newValue: T | null) => void;
  placeholder?: string;
  data?: T[];
  labelKey?: LabelKey<T>;
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

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState(
    value ? getLabel(value, labelKey) : null,
  );

  const handleValuePress = (newVal: T) => {
    setSelectOpen(false);
    setCurrentInput(getLabel(newVal, labelKey));
    onChange?.(newVal);
  };

  const handleButtonPress = () => {
    setSelectOpen(true);
  };

  // Filter values
  React.useEffect(() => {
    if (value) setCurrentInput(getLabel(value, labelKey));
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
