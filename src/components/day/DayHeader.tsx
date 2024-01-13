import { useNavigation } from "@/hooks";
import { Box, Button, Text } from "@/atoms";
import { getMonthIdFromDayId } from "@/utils";
import { useTodoModal } from "@/contexts";

type Props = {
  dayId: string;
};

export const DayHeader: React.FC<Props> = (props) => {
  const { dayId } = props;

  const { setTodoModalProps } = useTodoModal();
  const navigation = useNavigation();

  const handleCreatePress = () => {
    setTodoModalProps({ open: true, dayId });
  };

  return (
    <Box alignItems="flex-start" gap="xs" marginBottom="s">
      <Button
        onPress={() =>
          navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) })
        }
      >
        <Text>Go back</Text>
      </Button>
      <Button onPress={handleCreatePress}>
        <Text>Create</Text>
      </Button>
    </Box>
  );
};
