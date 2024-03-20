import { Text } from "@/atoms";
import { Feather } from "@expo/vector-icons";

type Props = {
  text: string;
};

export const TodoEasterEggs = (props: Props) => {
  const { text } = props;
  return (
    <>
      {(text.includes("café") || text.includes("coffee")) && (
        <Text>
          {"  "}
          <Feather name="coffee" />
        </Text>
      )}
      {text.includes("Thomas") && (
        <Text>
          {" "}
          <Feather name="heart" />
        </Text>
      )}
    </>
  );
};
