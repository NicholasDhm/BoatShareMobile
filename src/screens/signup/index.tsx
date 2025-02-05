import { View, Text, Pressable } from "react-native";
import { TextInput } from "../../components/text-input";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { styles } from "./styles";

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>(); 

  function handleUserSignup() {
    console.log("User signup");
  }

  function handleUserToLogin() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boat Share</Text>
      <TextInput title="Username" />
      <TextInput title="Email" />
      <TextInput title="Password" />
      <TextInput title="Confirm password" />
      <Button title="Create account" onPress={handleUserSignup} />
      <Pressable onPress={handleUserToLogin}>
        <Text style={styles.subText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}
