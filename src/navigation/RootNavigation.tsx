import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./TabNavigator";
import { AuthStack } from "./AuthStack";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { removeUser, setUser } from "../store/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { getUser } from "../services/firebaseService/dbService";

export const RootNavigation = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setLoading(true);
      if (usr) {
        const currentUser = getUser(usr.uid) 
        dispatch(setUser(currentUser));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        dispatch(removeUser());
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    // Render a loading indicator while checking the token
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MyTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;

// Example LoadingScreen component
const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};
