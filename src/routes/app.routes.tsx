import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Dashboard } from "../screens/dashboard";
import { Profile } from "../screens/profile";
import { ReservationTypeInfo } from "../screens/reservation-type-info";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarDays, User } from "lucide-react-native";
import { ReservationInfo } from "../screens/reservation-info";
import { CreateBoat } from "../screens/create-boat";
import { CalendarDayProps } from "../@types/calendar-day";
import { ReservationType } from "../@types/reservation-type";
import { colors } from "../themes/colors";
import { Platform, View } from "react-native";

type TabRoutes = {
  dashboard: undefined;
  profile: undefined;
};


export type StackRoutes = {
  tabNavigator: undefined;
  reservationTypeInfo: {
    reservationType: ReservationType;
  };
  reservationInfo: {
    calendarDay: CalendarDayProps;
    userBoatId: string;
  };
  profile: undefined;
  createBoat: undefined;
};



export type TabNavigatorProps = BottomTabNavigationProp<TabRoutes>;
export type StackNavigatorProps = StackNavigationProp<StackRoutes>;

const Tab = createBottomTabNavigator<TabRoutes>();
const Stack = createStackNavigator<StackRoutes>();

function TabNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bluePrimary }} edges={["right", "top", "left"]}>
      <View style={{ backgroundColor: colors.grayLight, height: "100%" }}>
        <Tab.Navigator
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
              marginBottom: Platform.OS === "ios" ? 40 : 10,
              marginRight: 10,
              marginLeft: 20,

            },
          }}
        >
          <Tab.Screen
            name="dashboard"
            component={Dashboard}
            options={{
              tabBarIcon: ({ color }) => <CalendarDays size={32} color={color} />,
            }}
          />
          <Tab.Screen
            name="profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color }) => <User size={32} color={color} />,
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="tabNavigator"
        component={TabNavigator}
      />
      <Stack.Screen
        name="reservationTypeInfo"
        component={ReservationTypeInfo}
      />
      <Stack.Screen
        name="reservationInfo"
        component={ReservationInfo}
      />
      <Stack.Screen
        name="createBoat"
        component={CreateBoat}
      />
    </Stack.Navigator>
  );
}
