import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-native-reanimated";

const queryClient = new QueryClient();

export default function Layout() {
  const [loaded] = useFonts({
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(user)/orders" options={{ headerShown: false }} />
        <Stack.Screen name="(user)/whishlist" options={{ headerShown: false }} />
        <Stack.Screen name="(user)/payment-methods" options={{ headerShown: false }} />
        <Stack.Screen name="(user)/delivery-address" options={{ headerShown: false }} />
        <Stack.Screen name="(user)/account-settings" options={{ headerShown: false }} />
        <Stack.Screen name="(user)/help-support" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
