import React from "react";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

import { Button } from "./Button";
import { useTheme } from "@/hooks";

type Props = {
  value: Date;
  onValueChange?: (date: Date) => void;
};

export const DatePicker = (props: Props) => {
  const { value, onValueChange } = props;

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const theme = useTheme();

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
          themeVariant="dark"
          mode="date"
          display="default"
          style={{
            borderColor: theme.colors.mainForeground,
            borderWidth: 1,
            borderRadius: theme.borderRadii.s,
          }}
          is24Hour={true}
          onChange={(e, d) => handleDateChange(e, d)}
        />
      )}

      {Platform.OS !== "ios" && (
        <Button
          variant="outlined"
          label={value.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          onPress={() => setShowDatePicker(true)}
        />
      )}
    </>
  );
};
