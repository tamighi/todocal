import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInputProps } from "react-native";

type Props = TextInputProps;

export const TextInput = (props: Props) => {
  return <BottomSheetTextInput {...props} />;
};
