import React from "react";
import { Pressable, TextInput } from "react-native";
import { Text } from "@/atoms";

import { Card, Container } from "@/atoms";

const CreateTodo = () => {
  const [value, setValue] = React.useState("Hello world");

  const create = async () => {};

  return (
    <Card width="100%" height="100%">
      <TextInput value={value} onChangeText={setValue} />
      <Pressable onPress={create}>
        <Text>Create</Text>
      </Pressable>
    </Card>
  );
};

export const CreateTodoDialog = (props: { open: boolean }) => {
  const { open } = props;

  return (
    <Container
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        display: open ? "flex" : "none",
      }}
    >
      <CreateTodo />
    </Container>
  );
};
