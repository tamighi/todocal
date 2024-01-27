import { Box, Text, Button } from "@/atoms";
import { useNavigation } from "@/hooks";
import { Month } from "@/models";
import { Feather } from "@expo/vector-icons";
import { getNextMonthId, getPrevMonthId } from "@/utils";

type Props = {
  month: Month;
};

export const MonthHeader: React.FC<Props> = (props) => {
  const { month } = props;

  const { navigate } = useNavigation();

  return (
    <Box flexDirection="row" margin="s" justifyContent="space-between">
      <Button
        variant="icon"
        onPress={() => navigate("Month", { monthId: getPrevMonthId(month.id) })}
      >
        <Feather name="arrow-left" size={22} />
      </Button>
      <Text>{month.id}</Text>
      <Button
        variant="icon"
        onPress={() => navigate("Month", { monthId: getNextMonthId(month.id) })}
      >
        <Feather name="arrow-right" size={22} />
      </Button>
    </Box>
  );
};
