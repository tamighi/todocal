import {
  TextInput as AtomTextInput,
  TextInputProps as AtomTextInputProps,
} from "@/atoms";
import { Platform } from "react-native";

export type TextInputProps = AtomTextInputProps & { textArea?: boolean };

export const TextInput = (props: TextInputProps) => {
  const { textArea = false, ...rest } = props;

  return (
    <AtomTextInput
      multiline={textArea}
      style={{ minHeight: textArea ? 48 : undefined }}
      paddingVertical={Platform.OS === "android" ? "none" : undefined}
      {...rest}
    />
  );
};
