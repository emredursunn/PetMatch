import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen";
import CreateScreen from "../screens/CreateScreen";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ReactNode } from "react";
import ProfileScreen from "../screens/ProfileScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type TabParams = {
  CreateScreen: undefined;
  MapScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<TabParams>();

const CustomButton = ({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={{
      width: 80,
      height: 80,
      borderRadius: 40,
      alignSelf: "center",
      backgroundColor: "rgba(78, 44, 191, 0.72)",
      top: -30,
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar, styles.shadows],
      }}
      initialRouteName="MapScreen"
    >
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabBarItem, { top: focused ? -8 : 0 }]}>
              <FontAwesome5
                name="map"
                size={focused ? 28 : 24}
                color={
                  focused ? "rgba(78, 44, 191, 1)" : "rgba(78, 44, 191, 0.50)"
                }
              />
              <Text
                style={{
                  color: focused
                    ? "rgba(78, 44,191,1)"
                    : "rgba(78, 44, 191, 0.5)",
                  fontSize: focused ? 16 : 12,
                }}
              >
                Map
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="paw" color={"white"} size={32} />
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabBarItem, { top: focused ? -8 : 0 }]}>
              <AntDesign
                name="user"
                size={focused ? 28 : 24}
                color={
                  focused ? "rgba(78, 44, 191, 1)" : "rgba(78, 44, 191, 0.50)"
                }
              />
              <Text
                style={{
                  color: focused
                    ? "rgba(78, 44,191,1)"
                    : "rgba(78, 44, 191, 0.5)",
                  fontSize: focused ? 16 : 12,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "white",
    borderRadius: 16,
    height: 80,
  },
  shadows: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 5,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});
