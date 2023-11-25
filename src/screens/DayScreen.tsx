import { Container } from "@/atoms";
import { DayComponent } from "@/components";

const DayScreen = () => {
  return (
    <Container margin="xl" flexDirection="row">
      <DayComponent />
    </Container>
  );
};

export default DayScreen;
