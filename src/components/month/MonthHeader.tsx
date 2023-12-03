import { Box, Text } from "@/atoms";
import { useNavigation } from "@/hooks";
import { Month } from "@/models";
import { getNextMonth, getPrevMonth } from "@/utils";

import { Pressable } from "react-native";

type Props = {
  month: Month;
};

export const MonthHeader: React.FC<Props> = (props) => {
  const { month } = props;

  const { navigate } = useNavigation();

  return (
    <Box flexDirection="row" width="100%" justifyContent="space-between">
      <Pressable
        onPress={() => navigate("Month", { monthId: getPrevMonth(month.id) })}
      >
        <Text>Prev</Text>
      </Pressable>
      <Text>{month.id}</Text>
      <Pressable
        onPress={() => navigate("Month", { monthId: getNextMonth(month.id) })}
      >
        <Text>Next</Text>
      </Pressable>
    </Box>
  );
};
