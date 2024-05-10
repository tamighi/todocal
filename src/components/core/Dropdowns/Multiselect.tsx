import React from "react";

import { TextStyle, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Box, Text } from "@/atoms";
import { useTheme } from "@/hooks";

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
  inputLabelKey?: PropertyKey<T>;
  valueKey?: PropertyKey<T>;
  renderItem?: (value: T, index: number, data: T[]) => React.ReactNode;
  dropdownStyle?: ViewStyle;
};

export const Multiselect = <T extends object | string>(props: Props<T>) => {
  const {
    values,
    onChange,
    placeholder,
    data = [],
    labelKey,
    inputLabelKey = labelKey,
    valueKey,
    renderItem: renderItemProp,
    dropdownStyle,
  } = props;

  const theme = useTheme();

  // DropDown
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [currentValues, setCurrentValues] = React.useState(values ?? []);

  const handleValuePress = (selectedVal: T) => {
    const valIndex = currentValues.findIndex(
      (val) =>
        getProperty(val, valueKey) === getProperty(selectedVal, valueKey),
    );

    let newValues: T[] = currentValues;

    if (valIndex === -1) {
      newValues = [...currentValues, selectedVal];
    } else {
      newValues = newValues.filter((_, i) => i !== valIndex);
    }

    setCurrentValues(newValues);
    onChange?.(newValues);
  };

  const handleSelectPress = () => {
    setSelectOpen(true);
  };

  React.useEffect(() => {
    if (values) setCurrentValues(values);
  }, [values]);

  const renderItem = (item: T, index: number, data: T[]) => {
    return (
      <Box
        borderColor="mainForeground"
        borderBottomWidth={data.length === index + 1 ? 0 : 1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="s"
        g="s"
      >
        <Text>{getProperty(item, labelKey)}</Text>
        <Box alignItems="center" justifyContent="center" height={22} width={18}>
          {currentValues.find(
            (v) => getProperty(v, valueKey) === getProperty(item, valueKey),
          ) && <Feather color={theme.colors.mainForeground} name="check" />}
        </Box>
      </Box>
    );
  };

  return (
    <Box position="relative" zIndex={100}>
      <Button
        variant="outlined"
        label={
          currentValues.length === 0
            ? placeholder
            : currentValues.map((v) => getProperty(v, inputLabelKey)).join(", ")
        }
        onPress={handleSelectPress}
        textStyle={{ flex: 1, flexWrap: "wrap" }}
      />
      <Dropdown
        values={data}
        renderItem={renderItemProp ?? renderItem}
        labelKey={labelKey}
        open={selectOpen}
        onItemClick={handleValuePress}
        onClose={() => setSelectOpen(false)}
        style={dropdownStyle}
      />
    </Box>
  );
};
