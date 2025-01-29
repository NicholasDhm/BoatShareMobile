import { Pressable } from "react-native";
import { TextInput } from "../../components/text-input/text-input";
import { Container, Title, CreateAccountText } from "./styles";

export function Login() {
  return (
    <Container>
      <Title>Boat Share</Title>
      <TextInput title="Username" />
      <TextInput title="Password" />
      <Pressable>
        <CreateAccountText>Create your account</CreateAccountText>
      </Pressable>
    </Container>
  );
}
