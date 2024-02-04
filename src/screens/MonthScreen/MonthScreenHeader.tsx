import { Feather } from "@expo/vector-icons";

import { Box, Text, Button } from "@/atoms";
import { getNextMonthId, getPrevMonthId } from "@/utils";

type Props = {
  monthId: string;
  onNavigate?: (monthId: string) => void;
};

export const MonthScreenHeader: React.FC<Props> = (props) => {
  const { monthId, onNavigate } = props;

  return (
    <Box flexDirection="row" margin="s" justifyContent="space-between">
      <Button
        variant="icon"
        onPress={() => onNavigate?.(getPrevMonthId(monthId))}
      >
        <Feather name="arrow-left" size={22} />
      </Button>
      <Text>{monthId}</Text>
      <Button
        variant="icon"
        onPress={() => onNavigate?.(getNextMonthId(monthId))}
      >
        <Feather name="arrow-right" size={22} />
      </Button>
    </Box>
  );
};
