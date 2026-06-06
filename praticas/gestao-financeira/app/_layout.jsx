import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "../constants/colors";
import GlobalState from "../contexts/GlobalState";

export default function RootLayout() {
  return (
    <GlobalState>
      <StatusBar style="light" backgroundColor={colors.primary} />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GlobalState>
  );
}