import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { SafeAreaView } from "react-native-safe-area-context";

export function Routes() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaView>
  );
}
