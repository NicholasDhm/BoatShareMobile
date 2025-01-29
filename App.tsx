import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Dashboard } from "./src/screens/dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Login } from "./src/screens/login";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Login />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
