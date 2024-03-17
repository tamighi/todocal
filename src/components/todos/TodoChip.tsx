import React from "react";

import { Feather } from "@expo/vector-icons";

import { Box, Chip, ChipProps, Text } from "@/atoms";
import { Checkbox } from "@/components/core";
import { useUpdate } from "@/hooks";
import { Todo } from "@/models";

import { TodoChipColorInfoBox } from "./TodoChipColorInfoBox";

type Props = {
  todo: Todo;
  dayId: string;
  minimal?: boolean;
} & ChipProps;

export const TodoChip: React.FC<Props> = (props) => {
  const { todo, minimal = false, dayId, ...rest } = props;

  const [checked, setChecked] = React.useState(todo.done);

  const { mutate } = useUpdate("todo");

  const handleCheck = (checked: boolean) => {
    mutate({ ...todo, done: checked });
    setChecked(checked);
  };

  return (
    <Chip
      flexDirection="row"
      backgroundColor="mainBackground"
      alignItems="center"
      gap="xs"
      style={{
        opacity: todo.done ? 0.4 : 1,
      }}
      {...rest}
    >
      <TodoChipColorInfoBox
        color={todo.tag?.color}
        urgent={todo.urgent}
        important={todo.important}
        width={minimal ? 5 : 8}
      />

      <Box flex={1}>
        <Text
          variant={minimal ? "small" : undefined}
          numberOfLines={minimal ? 1 : undefined}
        >
          {todo.content}

          {!minimal &&
            (todo.content.includes("café") ||
              todo.content.includes("coffee")) && (
              <>
                {"  "}
                <Feather name="coffee" />
              </>
            )}
          {!minimal && todo.content.includes("Thomas") && (
            <>
              {" "}
              <Feather name="heart" />
            </>
          )}
        </Text>
        {todo.description &&
          (!minimal ? (
            <Text variant="small" color="secondaryForeground">
              {todo.description}
            </Text>
          ) : (
            <Text lineHeight={5} color="secondaryForeground">
              ...
            </Text>
          ))}
      </Box>
      {!minimal && (
        <Checkbox
          margin="xs"
          alignSelf="flex-end"
          onPress={handleCheck}
          checked={checked}
        />
      )}
    </Chip>
  );
};
