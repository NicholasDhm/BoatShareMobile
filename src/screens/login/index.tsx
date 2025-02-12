import { useState } from "react";
import { Pressable, View, Text, Alert } from "react-native";
import { TextInput } from "../../components/text-input";
import { styles } from "./styles";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { useAuth } from "../../contexts/auth";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();

  async function handleUserSignIn() {
    try {
      if (!email.trim() || !password) {
        return Alert.alert('Erro', 'Por favor, preencha todos os campos');
      }

      await signIn(email, password);
    } catch (error) {
      Alert.alert('Erro na autenticação', 'Não foi possível fazer login');
    }
  }

  function handleUserToSignUp() {
    navigation.navigate("signup");
  }

  return (
    <View style={styles.container}>
      <SvgIcon icon="boat" size={48} color={colors.bluePrimary } />
      <Text style={styles.title}>Boat Share</Text>
      <TextInput 
        title="Email" 
        placeholder="Email"

        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        title="Password" 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry

      />
      <Button title="Login" onPress={handleUserSignIn} />
      <Pressable onPress={handleUserToSignUp}>
        <Text style={styles.subText}>Create your account</Text>
      </Pressable>
    </View>
  );
}
