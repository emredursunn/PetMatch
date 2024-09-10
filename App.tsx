import { RootNavigation } from "./src/navigation/RootNavigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Provider } from "react-redux";
import store from "./src/store/store";

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <StatusBar backgroundColor="transparent" />
            <SafeAreaView style={{ flex: 1 }}>
              <RootNavigation />
              <Toast />
            </SafeAreaView>
          </Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
