import React from "react";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

import { Button } from "./Button";

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
        <Button
          variant="outlined"
          alignSelf="center"
          label={value.toLocaleDateString()}
          onPress={() => setShowDatePicker(true)}
        />
      )}
    </>
  );
};
