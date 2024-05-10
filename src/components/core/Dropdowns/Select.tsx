import React from "react";

import { Dropdown } from "./Dropdown";
import { Button } from "../Button";
import { PropertyKey, getProperty } from "./utils";

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
  const ref = React.useRef(null);

  const handleValuePress = (newVal: T) => {
    setSelectOpen(false);
    setCurrentInput(getProperty(newVal, labelKey));
    onChange?.(newVal);
  };

  const handleButtonPress = () => {
    setSelectOpen(true);
  };

  React.useEffect(() => {
    if (value) setCurrentInput(getProperty(value, labelKey));
  }, [value]);

  return (
    <>
      <Button
        ref={ref}
        variant="outlined"
        onPress={handleButtonPress}
        label={currentInput ?? placeholder}
      />
      <Dropdown
        parentRef={ref}
        values={data}
        renderItem={renderItem}
        labelKey={labelKey}
        open={selectOpen}
        onItemClick={handleValuePress}
        onClose={() => setSelectOpen(false)}
      />
    </>
  );
};
