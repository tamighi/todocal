import { Feather } from "@expo/vector-icons";

import { Box, Text } from "@/atoms";
import { getNextMonthId, getPrevMonthId } from "@/utils";
import { Pressable } from "react-native";

type Props = {
  monthId: string;
  onNavigate?: (monthId: string) => void;
};

export const MonthScreenNavigation: React.FC<Props> = (props) => {
  const { monthId, onNavigate } = props;

  return (
    <Box flexDirection="row" margin="s" justifyContent="space-between">
      <Pressable onPress={() => onNavigate?.(getPrevMonthId(monthId))}>
        <Feather name="arrow-left" size={22} />
      </Pressable>
      <Text>{monthId}</Text>
      <Pressable onPress={() => onNavigate?.(getNextMonthId(monthId))}>
        <Feather name="arrow-right" size={22} />
      </Pressable>
    </Box>
  );
};
