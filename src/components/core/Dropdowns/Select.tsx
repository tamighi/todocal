import React from "react";

import { Dropdown } from "./Dropdown";
import { Button } from "../Button";
import { PropertyKey, getProperty } from "./utils";
import { Box, BoxProps } from "@/atoms";
import { IconButton } from "../IconButton";
import { ViewStyle } from "react-native";

type Props<T extends object | string> = {
  value?: T;
  onChange?: (newValue: T | null) => void;
  placeholder?: string;
  data?: T[];
  labelKey?: PropertyKey<T>;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
  showClearButton?: boolean;
  dropdownStyle?: ViewStyle;
} & BoxProps;

export const Select = <T extends object | string>(props: Props<T>) => {
  const {
    value,
    onChange,
    placeholder,
    data = [],
    labelKey,
    renderItem,
    showClearButton = false,
    dropdownStyle,
    ...rest
  } = props;

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState(
    value ? getProperty(value, labelKey) : null,
  );

  const handleValuePress = (newVal: T | null) => {
    setSelectOpen(false);
    setCurrentInput(newVal ? getProperty(newVal, labelKey) : null);
    onChange?.(newVal);
  };

  const handleButtonPress = () => {
    setSelectOpen(true);
  };

  React.useEffect(() => {
    if (value) setCurrentInput(getProperty(value, labelKey));
  }, [value]);

  return (
    <Box
      position="relative"
      zIndex={100}
      flexDirection="row"
      alignItems="center"
      {...rest}
    >
      <Box flexGrow={1}>
        <Button
          variant="outlined"
          onPress={handleButtonPress}
          label={currentInput ?? placeholder}
        />
      </Box>
      {showClearButton && (
        <IconButton
          name="x"
          iconSize={18}
          onPress={() => handleValuePress(null)}
        />
      )}
      <Dropdown
        values={data}
        renderItem={renderItem}
        labelKey={labelKey}
        open={selectOpen}
        onItemClick={handleValuePress}
        onClose={() => setSelectOpen(false)}
        style={dropdownStyle}
      />
    </Box>
  );
};
