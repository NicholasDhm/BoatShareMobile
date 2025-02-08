import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { TextInput } from "../../components/text-input";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { styles } from "./styles";
import { useAuth } from "../../contexts/auth";
import { SvgIcon } from "../../components/svg";
import { colors } from "../../themes/colors";

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { signUp } = useAuth();

  async function handleUserSignup() {
    try {
      if (!name.trim() || !email.trim() || !password || !confirmPassword) {
        return Alert.alert('Erro', 'Por favor, preencha todos os campos');
      }

      if (password !== confirmPassword) {
        return Alert.alert('Erro', 'As senhas não conferem');
      }
      
      await signUp(name, email, password);
    } catch (error) {
      Alert.alert('Erro no cadastro', 'Não foi possível criar a conta');
    }
  }

  function handleUserToLogin() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <SvgIcon icon="boat" size={48} color={colors.bluePrimary } />
      <Text style={styles.title}>Boat Share</Text>
      <TextInput 
        title="Username" 
        placeholder="Username"
        value={name}
        onChangeText={setName}

      />
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
      <TextInput 
        title="Confirm password" 
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry

      />
      <Button title="Create account" onPress={handleUserSignup} />
      <Pressable onPress={handleUserToLogin}>
        <Text style={styles.subText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}
