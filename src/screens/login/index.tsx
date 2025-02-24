import { useState } from "react";
import { Pressable, View, Text, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "../../components/text-input";
import { styles } from "./styles";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { useInfo } from "../../contexts/info";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useInfo();

  async function handleUserSignIn() {
    try {
      if (!email.trim() || !password) {
        return Alert.alert('Erro', 'Por favor, preencha todos os campos');
      }

      await signIn(email, password);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to sign in';
      Alert.alert('Sign in Error', message);
    }
  }

  function handleUserToSignUp() {
    navigation.navigate("signup");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <SvgIcon icon="boat" size={64} color={colors.prussianBluePrimary} />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.inputsContainer}>
            <TextInput
              title="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              title="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          <Button 
            title="Sign In" 
            onPress={handleUserSignIn}
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Pressable onPress={handleUserToSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
