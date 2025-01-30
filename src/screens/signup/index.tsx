import { Pressable } from "react-native";
import { TextInput } from "../../components/text-input";
import { Container, Title, SubText } from "./styles";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes"; // Import the type

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>(); // Use the type here

  function handleUserSignup() {
    console.log("User signup");
  }

  function handleUserToLogin() {
    navigation.goBack();
  }

  return (
    <Container>
      <Title>Boat Share</Title>
      <TextInput title="Username" />
      <TextInput title="Email" />
      <TextInput title="Password" />
      <TextInput title="Confirm password" />
      <Button title="Create account" onPress={handleUserSignup} />
      <Pressable onPress={handleUserToLogin}>
        <SubText>Already have an account? Login</SubText>
      </Pressable>
    </Container>
  );
}
