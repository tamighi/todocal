import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = Omit<TextInputProps, "onChangeText"> & {
  name: string;
  onChangeText: (name: string, value: string) => void;
};

const TextInputComponent: React.FC<Props> = (props: Props) => {
  const { name, onChangeText, ...rest } = props;
  return (
    <TextInput onChangeText={(value) => onChangeText(name, value)} {...rest} />
  );
};

export default TextInputComponent;
