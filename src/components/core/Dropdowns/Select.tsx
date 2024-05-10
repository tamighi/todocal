import React from "react";

import { Dropdown } from "./Dropdown";
import { Button } from "../Button";
import { PropertyKey, getProperty } from "./utils";
import { Box } from "@/atoms";
import { IconButton } from "../IconButton";

type Props<T extends object | string> = {
  value?: T;
  onChange?: (newValue: T | null) => void;
  placeholder?: string;
  data?: T[];
  labelKey?: PropertyKey<T>;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
};

export const Select = <T extends object | string>(props: Props<T>) => {
  const {
    value,
    onChange,
    placeholder,
    data = [],
    labelKey,
    renderItem,
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
    >
      <Box flexGrow={1}>
        <Button
          variant="outlined"
          onPress={handleButtonPress}
          label={currentInput ?? placeholder}
        />
      </Box>
      <IconButton
        name="x"
        iconSize={18}
        onPress={() => handleValuePress(null)}
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
