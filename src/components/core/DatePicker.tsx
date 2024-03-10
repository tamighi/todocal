import React from "react";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { Platform, Pressable } from "react-native";

import { Box, Text } from "@/atoms";

type Props = {
  value: Date;
  onValueChange?: (date: Date) => void;
};

export const DatePicker = (props: Props) => {
  const { value, onValueChange } = props;

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (!date || event.type === "dismissed") return;

    onValueChange?.(date);
  };

  return (
    <>
      {(showDatePicker || Platform.OS === "ios") && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          is24Hour={true}
          onChange={(e, d) => handleDateChange(e, d)}
        />
      )}

      {Platform.OS !== "ios" && (
        <Box
          flex={1}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Pressable onPress={() => setShowDatePicker(true)}>
            <Feather name="calendar" size={24} />
          </Pressable>
          <Text>{value.toLocaleDateString()}</Text>
        </Box>
      )}
    </>
  );
};