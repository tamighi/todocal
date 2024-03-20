import { Feather } from "@expo/vector-icons";

import { Box, Text } from "@/atoms";
import { getNextMonthId, getPrevMonthId } from "@/utils";
import { Pressable } from "react-native";
import { useNavigation } from "@/hooks";

type Props = {
  monthId: string;
};

export const MonthScreenNavigation: React.FC<Props> = (props) => {
  const { monthId } = props;
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" margin="s" justifyContent="space-between">
      <Pressable
        onPress={() =>
          navigation.navigate("Month", { monthId: getPrevMonthId(monthId) })
        }
      >
        <Feather name="arrow-left" size={22} />
      </Pressable>
      <Text>{monthId}</Text>
      <Pressable
        onPress={() =>
          navigation.navigate("Month", { monthId: getNextMonthId(monthId) })
        }
      >
        <Feather name="arrow-right" size={22} />
      </Pressable>
    </Box>
  );
};
