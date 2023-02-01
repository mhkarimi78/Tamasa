import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { customFonts } from "./static/Fonts";

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component */}
      <AuthProvider>
        <StackNavigator onLayout={onLayoutRootView} />
      </AuthProvider>
    </NavigationContainer>
  );
}
