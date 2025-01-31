import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";

import { Routes } from "./src/routes";
import { Profile } from "./src/screens/profile";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e6f2ff" }}>
      {/* <Routes /> */}
      <Profile></Profile>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
