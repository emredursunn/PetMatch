import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./TabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

export const RootNavigation = () => {
  const isAuth = false;
  return (
    <NavigationContainer>
      {isAuth ? <MyTabs /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
