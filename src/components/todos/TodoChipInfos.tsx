import { Box } from "@/atoms";
import { Todo } from "@/models";
import { ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  todo: Todo;
  iconSize?: number;
  containerStyle?: ViewStyle;
};

export const TodoChipInfos = (props: Props) => {
  const { todo, containerStyle = {}, iconSize = 16 } = props;

  return (
    <Box overflow="visible" flexDirection="row" style={containerStyle}>
      {todo.important && <Feather name="alert-circle" size={iconSize} />}
      {todo.urgent && <Feather name="alert-triangle" size={iconSize} />}
    </Box>
  );
};
