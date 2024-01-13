import { Box, Text, Button } from "@/atoms";
import { useNavigation } from "@/hooks";
import { Month } from "@/models";
import { getNextMonthId, getPrevMonthId } from "@/utils";

type Props = {
  month: Month;
};

export const MonthHeader: React.FC<Props> = (props) => {
  const { month } = props;

  const { navigate } = useNavigation();

  return (
    <Box flexDirection="row" width="100%" justifyContent="space-between">
      <Button
        onPress={() => navigate("Month", { monthId: getPrevMonthId(month.id) })}
      >
        <Text>Prev</Text>
      </Button>
      <Text>{month.id}</Text>
      <Button
        onPress={() => navigate("Month", { monthId: getNextMonthId(month.id) })}
      >
        <Text>Next</Text>
      </Button>
    </Box>
  );
};
