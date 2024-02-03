import { Box, Text, Button } from "@/atoms";
import { useNavigation } from "@/hooks";
import { Feather } from "@expo/vector-icons";
import { getNextMonthId, getPrevMonthId } from "@/utils";

type Props = {
  monthId: string;
};

export const MonthScreenHeader: React.FC<Props> = (props) => {
  const { monthId } = props;

  const { navigate } = useNavigation();

  return (
    <Box flexDirection="row" margin="s" justifyContent="space-between">
      <Button
        variant="icon"
        onPress={() => navigate("Month", { monthId: getPrevMonthId(monthId) })}
      >
        <Feather name="arrow-left" size={22} />
      </Button>
      <Text>{monthId}</Text>
      <Button
        variant="icon"
        onPress={() => navigate("Month", { monthId: getNextMonthId(monthId) })}
      >
        <Feather name="arrow-right" size={22} />
      </Button>
    </Box>
  );
};
