import { Pressable } from "react-native";
import { TextInput } from "../../components/text-input";
import { Container, Title, SubText } from "./styles";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes"; // Import the type

export function Login() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>(); // Use the type here

  function handleUserLogin() {
    console.log("User login");
  }

  function handleUserToSignUp() {
    navigation.navigate("signup");
  }

  return (
    <Container>
      <Title>Boat Share</Title>
      <TextInput title="Username" />
      <TextInput title="Password" />
      <Button title="Login" onPress={handleUserLogin} />
      <Pressable onPress={handleUserToSignUp}>
        <SubText>Create your account</SubText>
      </Pressable>
    </Container>
  );
}
