import { useNavigation } from "@/hooks";
import { Box } from "@/atoms";
import { getMonthIdFromDayId } from "@/utils";
import { useTodoModal } from "@/contexts";
import { IconButton } from "@/components";

type Props = {
  dayId: string;
};

export const DayScreenFooterButtons: React.FC<Props> = (props) => {
  const { dayId } = props;

  const { setTodoModalProps } = useTodoModal();
  const navigation = useNavigation();

  const handleCreatePress = () => {
    setTodoModalProps({ open: true, dayId });
  };

  return (
    <Box flexDirection="row" justifyContent="space-between" margin="l">
      <IconButton
        name="calendar"
        onPress={() =>
          navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) })
        }
      />
      <IconButton name="plus" onPress={handleCreatePress} />
    </Box>
  );
};
