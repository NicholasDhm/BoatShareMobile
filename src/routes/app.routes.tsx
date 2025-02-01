import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Profile } from "../screens/profile";
import {
  Calendar,
  CalendarDays,
  GitGraphIcon,
  User,
} from "lucide-react-native";

type AppRoutes = {
  home: undefined;
  dashboard: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#e6f2ff",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#858585",
            borderTopWidth: 0,
            height: 68,
            paddingTop: 15,
          },
        }}
      >
        <Screen
          name="dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: () => <CalendarDays size={32} color={"white"} />,
          }}
        />
        <Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: () => <User size={32} color={"white"} />,
          }}
        />
      </Navigator>
    </SafeAreaView>
  );
}
