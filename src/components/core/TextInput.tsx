import { Platform } from "react-native";

import {
  TextInput as AtomTextInput,
  TextInputProps as AtomTextInputProps,
  Box,
  InputHandle,
} from "@/atoms";
import React from "react";
import { IconButton } from "./IconButton";

export type TextInputProps = AtomTextInputProps & {
  textArea?: boolean;
  showClearButton?: boolean;
};

export const TextInput = (props: TextInputProps) => {
  const {
    textArea = false,
    showClearButton = false,
    value: valueProp = "",
    onChangeText: onChangeTextProp,
    style = {},
    ...rest
  } = props;

  const ref = React.useRef<InputHandle>(null);
  const [currentValue, setCurrentValue] = React.useState(valueProp);

  React.useEffect(() => {
    setCurrentValue(valueProp);
  }, [valueProp]);

  const onChangeText = (v: string) => {
    setCurrentValue(v);
    onChangeTextProp?.(v);
  };

  const onClear = () => {
    ref.current?.setValue("");
    onChangeText("");
  };

  return (
    <Box flexDirection="row" position="relative">
      <AtomTextInput
        ref={ref}
        multiline={textArea}
        style={{
          flex: 1,
          paddingRight: 30,
          minHeight: textArea ? 48 : undefined,
          ...style,
        }}
        paddingVertical={Platform.OS === "android" ? "xxs" : undefined}
        value={valueProp}
        onChangeText={onChangeText}
        {...rest}
      />
      {showClearButton && currentValue !== "" && (
        <IconButton
          onPress={onClear}
          name="x"
          position="absolute"
          right={0}
          top={-4}
          iconSize={18}
          style={{ backgroundColor: undefined }}
        />
      )}
    </Box>
  );
};
