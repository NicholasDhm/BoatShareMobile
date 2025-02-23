import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import { InfoProvider } from './src/contexts/info';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InfoProvider>
        <Routes />
        <StatusBar translucent backgroundColor="transparent" style="light" />
      </InfoProvider>
    </GestureHandlerRootView>
  );
}