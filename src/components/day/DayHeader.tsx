import { Pressable } from "react-native";

import { useNavigation } from "@/hooks";
import { Box, Text } from "@/atoms";
import { getMonthIdFromDayId } from "@/utils";

type Props = {
  onCreatePress: () => void;
  dayId: string;
};

export const DayHeader: React.FC<Props> = (props) => {
  const { onCreatePress, dayId } = props;
  const navigation = useNavigation();

  return (
    <Box>
      <Pressable
        onPress={() =>
          navigation.navigate("Month", { monthId: getMonthIdFromDayId(dayId) })
        }
      >
        <Text>Go back</Text>
      </Pressable>
      <Pressable onPress={onCreatePress}>
        <Text>Create</Text>
      </Pressable>
    </Box>
  );
};
