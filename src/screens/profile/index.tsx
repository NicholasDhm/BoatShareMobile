import { Container, Title, SubText, DataContainer } from "./styles";

export function Profile() {
    return (
    // <Header></Header>
    <Container>
      <Title>Profile</Title>
      <DataContainer>
        <SubText>Username: Nick</SubText>
        {/* <SubText>Id: 1</SubText> */}
        <SubText>Email: nick@gmail.com</SubText>
        <SubText>Password: nickisthebesthumanalive</SubText>
        {/* <SubText>Role: Admin</SubText> */}
      </DataContainer>

      <Title>Your Boats:</Title>
      {/* border bottom and a dropdown with a arrow that spins to display or not opened */}
      <DataContainer>
        {/* Reutilize description from the calendar to show calendar */}
        <SubText>Standard: 2</SubText>
        <SubText>Substitution: 2</SubText>
        <SubText>Contingency: 1</SubText>
      </DataContainer>

      <Title>Your Quotas:</Title>
      <DataContainer>
        {/* Reutilize description from the calendar to show calendar */}
        <SubText>Standard: 2</SubText>
        <SubText>Substitution: 2</SubText>
        <SubText>Contingency: 1</SubText>
      </DataContainer>

      {/* <History></History> */}
    </Container>
  );
}
