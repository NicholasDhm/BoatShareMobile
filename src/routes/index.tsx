import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/auth";
import { Loading } from "../components/loading";
import { colors } from "../themes/colors";

export function Routes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bluePrimary }}>
      <NavigationContainer>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </SafeAreaView>
  );

}
