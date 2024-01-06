import { Pressable } from "react-native";

import { useNavigation } from "@/hooks";
import { Box, Text } from "@/atoms";
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
    <Box>
      <Pressable
        onPress={() =>
          navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) })
        }
      >
        <Text>Go back</Text>
      </Pressable>
      <Pressable onPress={handleCreatePress}>
        <Text>Create</Text>
      </Pressable>
    </Box>
  );
};
