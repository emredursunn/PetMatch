import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen";
import CreateScreen from "../screens/CreateScreen";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ReactNode } from "react";
import ProfileScreen from "../screens/profile/ProfileScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../utils/constants";
import { ProfileStack } from "./ProfileStack";

type TabParams = {
  CreateScreen: undefined;
  MapScreen: undefined;
  ProfileStack: undefined;
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
      backgroundColor: colors.purple_700,
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
        tabBarHideOnKeyboard: true,
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
                size={24}
                color={focused ? colors.purple : colors.purple_500}
              />
              <Text
                style={{
                  color: focused ? colors.purple : colors.purple_500,
                  fontSize: 14,
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
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabBarItem, { top: focused ? -8 : 0 }]}>
              <AntDesign
                name="user"
                size={24}
                color={focused ? colors.purple : colors.purple_500}
              />
              <Text
                style={{
                  color: focused ? colors.purple : colors.purple_500,
                  fontSize: 14,
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
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    height: 80,
  },
  shadows: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 22,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:colors.transparent
  },
});
