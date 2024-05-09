import React from "react";

import { Box, Text } from "@/atoms";
import { Pressable, TextStyle, ViewStyle } from "react-native";
import { Dropdown } from "./Dropdown";
import { PropertyKey, getProperty } from "./utils";

type Props<T extends object | string> = {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
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
    containerStyle,
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
    <Box style={containerStyle} zIndex={2}>
      <Pressable onPress={handleSelectPress}>
        <Box>
          {!!placeholder && currentInput.length === 0 ? (
            <Text>{placeholder}</Text>
          ) : null}
          {currentInput.map((value) => {
            return <Text>{getProperty(value, labelKey)}</Text>;
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
