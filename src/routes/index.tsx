import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useInfo } from "../contexts/info";
import { Loading } from "../components/loading";
import React from "react";

export function Routes() {
  const { user, isLoading } = useInfo();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );

}
