import { Box, Text } from "@/atoms";
import { getNextMonthId, getPrevMonthId } from "@/utils";
import { useNavigation } from "@/hooks";
import { IconButton } from "@/components";

type Props = {
  monthId: string;
};

export const MonthScreenNavigation: React.FC<Props> = (props) => {
  const { monthId } = props;
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" justifyContent="space-between">
      <IconButton
        onPress={() =>
          navigation.navigate("Month", { monthId: getPrevMonthId(monthId) })
        }
        name="arrow-left"
      />
      <Text>{monthId}</Text>
      <IconButton
        name="arrow-right"
        onPress={() =>
          navigation.navigate("Month", { monthId: getNextMonthId(monthId) })
        }
      />
    </Box>
  );
};
