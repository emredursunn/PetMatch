import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./TabNavigator";

export const RootNavigation = () => (
  <NavigationContainer>
    <MyTabs />
  </NavigationContainer>
);
