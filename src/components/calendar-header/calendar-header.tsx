import { ArrowLeft, ArrowRight } from "lucide-react-native";

import { Container, TextContainer, Button, DateText } from "./styles";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });

export function CalendarHeader() {
  return (
    <Container>
      <Button>
        <ArrowLeft />
      </Button>
      <TextContainer>
        <DateText>{currentYear}</DateText>
        <DateText>{currentMonth}</DateText>
      </TextContainer>
      <Button>
        <ArrowRight />
      </Button>
    </Container>
  );
}
