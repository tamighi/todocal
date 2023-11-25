import { Container } from "@/atoms";
import { DayComponent } from "@/components";

const DayScreen = () => {
  return (
    <Container
      margin="xl"
      borderStyle="solid"
      borderColor="$foreground"
      borderWidth={2}
    >
      <DayComponent />
    </Container>
  );
};

export default DayScreen;
