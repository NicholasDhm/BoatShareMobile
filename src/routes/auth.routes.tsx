import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Login } from "../screens/login";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUp } from "../screens/signup";

type AuthRoutes = {
  login: undefined;
  signup: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="login" component={Login} />
        <Screen name="signup" component={SignUp} />
      </Navigator>
    </SafeAreaView>
  );
}
