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
import { ReservationDescription } from "../screens/reservation-description";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarDays, User } from "lucide-react-native";
import { ReservationInfo } from "../screens/reservation-info";
import { CreateBoat } from "../screens/create-boat";
import { CalendarDayProps } from "../@types/calendar-day";
import { ReservationType } from "../@types/reservation-type";
import { colors } from "../themes/colors";
import { Platform, View, Animated, Dimensions, TouchableOpacity } from "react-native";
import { useEffect, useRef } from 'react';
import { Boat } from "../@types/boat";
import { BoatDetails } from "../screens/boat-details";

type TabRoutes = {
  dashboard: undefined;
  profile: undefined;
};

export type StackRoutes = {
  tabNavigator: undefined;
  reservationDescription: {
    reservationType: ReservationType;
  };
  reservationInfo: {
    calendarDay: CalendarDayProps;
  };
  profile: undefined;
  createBoat: undefined;
  boatDetails: {
    boat: Boat;
  };
};

export type TabNavigatorProps = BottomTabNavigationProp<TabRoutes>;
export type StackNavigatorProps = StackNavigationProp<StackRoutes>;

const Tab = createBottomTabNavigator<TabRoutes>();
const Stack = createStackNavigator<StackRoutes>();

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const tabWidth = windowWidth * 0.85 / 2; // 85% width divided by 2 tabs
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      tension: 68,
      friction: 10
    }).start();
  }, [state.index]);

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: 68,
      width: "85%",
      position: "absolute",
      bottom: Platform.OS === "ios" ? 40 : 20, // Changed from marginBottom to bottom
      marginHorizontal: "7.5%",
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 }, // Reversed shadow direction
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    }}>
      <Animated.View style={{
        width: tabWidth - 20,
        left: 10,
        alignSelf: 'center',
        top: 8,
        height: 52,
        borderRadius: 50,
        position: 'absolute',
        backgroundColor: colors.prussianBluePrimary,
        transform: [{ translateX: slideAnim }],
      }} />
      
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate(route.name)}
          >
            {options.tabBarIcon({ color: isFocused ? '#FFF' : colors.prussianBluePrimary })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

function TabNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.prussianBluePrimary }} edges={["right", "top", "left"]}>
      <View style={{ height: "100%" }}>
        <Tab.Navigator
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="dashboard"
            component={Dashboard}
            options={{
              tabBarIcon: ({ color }) => <CalendarDays size={32} color={color}/>,
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
        name="reservationDescription"
        component={ReservationDescription}
      />
      <Stack.Screen
        name="reservationInfo"
        component={ReservationInfo}
      />
      <Stack.Screen
        name="createBoat"
        component={CreateBoat}
      />
      <Stack.Screen
        name="boatDetails"
        component={BoatDetails}
      />
    </Stack.Navigator>
  );
}
