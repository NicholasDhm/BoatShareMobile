import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Dashboard } from "../screens/dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Profile } from "../screens/profile";

type AppRoutes = {
  home: undefined;
  dashboard: undefined;
  profile: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="profile" component={Profile} />
    </Navigator>
    </SafeAreaView>
  );
}
