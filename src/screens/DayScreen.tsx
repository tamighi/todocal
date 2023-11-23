import { Container, Text } from "../atoms";
import { NOTES_FIXTURES } from "../fixtures";

const DayScreen = () => {
  return (
    <Container>
      <Container
        margin="xl"
        padding="s"
        gap="s"
        borderStyle="solid"
        borderColor="$foreground"
        borderWidth={2}
      >
        {NOTES_FIXTURES.map((note) => (
          <Text key={note.id}>{note.title}</Text>
        ))}
      </Container>
    </Container>
  );
};

export default DayScreen;
