import React from "react";

import { TextStyle } from "react-native";

import { Box } from "@/atoms";

import { Dropdown } from "./Dropdown";
import { PropertyKey, getProperty } from "./utils";
import { Button } from "../Button";

type Props<T extends object | string> = {
  inputStyle?: TextStyle;
  values?: T[];
  onChange?: (newValue: T[]) => void;
  placeholder?: string;
  data?: T[];
  labelKey?: PropertyKey<T>;
  valueKey?: PropertyKey<T>;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
};

export const Multiselect = <T extends object | string>(props: Props<T>) => {
  const {
    values,
    onChange,
    placeholder,
    data = [],
    labelKey,
    valueKey,
    renderItem,
  } = props;

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [currentInput, setCurrentInput] = React.useState(values ?? []);

  const handleValuePress = (selectedVal: T) => {
    const valIndex = currentInput.findIndex(
      (val) =>
        getProperty(val, valueKey) === getProperty(selectedVal, valueKey),
    );

    let newValues: T[];

    if (valIndex === -1) {
      newValues = [...currentInput, selectedVal];
    } else {
      newValues = currentInput.slice(valIndex, 1);
    }

    setCurrentInput(newValues);
    onChange?.(newValues);
  };

  const handleSelectPress = () => {
    setSelectOpen(true);
  };

  React.useEffect(() => {
    if (values) setCurrentInput(values);
  }, [values]);

  return (
    <Box position="relative" zIndex={100}>
      <Button
        variant="outlined"
        label={placeholder}
        onPress={handleSelectPress}
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
