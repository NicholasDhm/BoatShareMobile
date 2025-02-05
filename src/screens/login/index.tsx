import { Pressable, View, Text } from "react-native";
import { TextInput } from "../../components/text-input";
import { styles } from "./styles";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";

export function Login() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleUserLogin() {
    console.log("User login");
  }

  function handleUserToSignUp() {
    navigation.navigate("signup");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boat Share</Text>
      <TextInput title="Username" />
      <TextInput title="Password" />
      <Button title="Login" onPress={handleUserLogin} />
      <Pressable onPress={handleUserToSignUp}>
        <Text style={styles.subText}>Create your account</Text>
      </Pressable>
    </View>
  );
}
