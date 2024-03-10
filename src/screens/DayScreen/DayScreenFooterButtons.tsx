import { useNavigation } from "@/hooks";
import { Box } from "@/atoms";
import { Feather } from "@expo/vector-icons";
import { getMonthIdFromDayId } from "@/utils";
import { useTodoModal } from "@/contexts";
import { Pressable } from "react-native";

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
    <Box
      position="absolute"
      flexDirection="row"
      justifyContent="space-between"
      bottom={0}
      left={0}
      right={0}
      margin="lg"
    >
      <Pressable
        onPress={() =>
          navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) })
        }
      >
        <Feather name="calendar" size={26} />
      </Pressable>
      <Pressable onPress={handleCreatePress}>
        <Feather name="plus" size={26} />
      </Pressable>
    </Box>
  );
};
