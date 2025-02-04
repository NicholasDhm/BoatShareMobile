import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Profile } from "../screens/profile";
import { CalendarDays, User } from "lucide-react-native";

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
          tabBarActiveTintColor: "#89c2ff",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#5f5f5f",
            borderTopWidth: 0,
            borderRadius: 50,
            height: 68,
            paddingTop: 15,
            marginBottom: 10,
            marginRight: 10,
            marginLeft: 20,
          },
        }}
      >
        <Screen
          name="dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color }) => <CalendarDays size={32} color={color} />,
          }}
        />
        <Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => <User size={32} color={color} />,
          }}
        />
      </Navigator>
    </SafeAreaView>
  );
}
