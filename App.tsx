import { StatusBar } from "expo-status-bar";
import { InfoProvider } from './src/contexts/info';
import { Routes } from './src/routes';

export default function App() {
  return (
    <InfoProvider>
      <Routes />
      <StatusBar translucent backgroundColor="transparent" style="light" />
    </InfoProvider>
  );
}