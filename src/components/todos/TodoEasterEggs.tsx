import { Feather } from "@expo/vector-icons";

type Props = {
  text: string;
};

export const TodoEasterEggs = (props: Props) => {
  const { text } = props;
  return (
    <>
      {(text.includes("café") || text.includes("coffee")) && (
        <>
          {"  "}
          <Feather name="coffee" />
        </>
      )}
      {text.includes("Thomas") && (
        <>
          {" "}
          <Feather name="heart" />
        </>
      )}
    </>
  );
};
