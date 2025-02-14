import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from './src/contexts/auth';
import { Routes } from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
      <StatusBar translucent backgroundColor="transparent" style="light"/>
    </AuthProvider>

  );
}