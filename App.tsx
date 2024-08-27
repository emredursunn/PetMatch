import React from "react";
import { RootNavigation } from "./src/navigation/RootNavigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor="transparent" />
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigation />
        <Toast />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
