import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { TextInput } from "../../components/text-input";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { styles } from "./styles";
import { useInfo } from "../../contexts/info";
import { SvgIcon } from "../../components/svg";
import { colors } from "../../themes/colors";

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { signUp } = useInfo();

  async function handleUserSignup() {
    try {
      if (!name.trim() || !email.trim() || !password || !confirmPassword) {
        return Alert.alert('Error', 'Please fill in all fields');
      }

      if (password !== confirmPassword) {
        return Alert.alert('Error', 'Passwords do not match');
      }

      await signUp(name, email, password);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to create account';
      Alert.alert('Sign up Error', message);
    }
  }

  function handleUserToLogin() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <SvgIcon icon="boat" size={64} color={colors.white} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our boat sharing community</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputsContainer}>
            <TextInput
              title="Username"
              placeholder="Enter your username"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
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
            <TextInput
              title="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <Button 
            title="Create Account" 
            onPress={handleUserSignup}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>
            <Pressable onPress={handleUserToLogin}>
              <Text style={styles.footerLink}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
