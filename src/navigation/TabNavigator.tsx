import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import CreateScreen from '../screens/CreateScreen';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
    </Tab.Navigator>
  );
}