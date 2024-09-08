import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import Ads from "../screens/profile/Ads";


export type ProfileStackParams = {
  Profile: undefined;
  Ads: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParams>();

export const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown:false}}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Ads" component={Ads} />
  </Stack.Navigator>
);
