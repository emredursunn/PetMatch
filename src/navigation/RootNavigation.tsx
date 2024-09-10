import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./TabNavigator";
import { AuthStack } from "./AuthStack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { signIn } from "../store/authSlice";
import { getUser } from "../services/firebaseService/dbService";
import { getFromStorage } from "../utils/helperFunctions";
import { LoadingScreen } from "../components/Loading";

export const RootNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const fetchExistUser = async () => {
      try {
        const uid = await getFromStorage("uid");
        if (uid) {
          const usr = await getUser(uid);
          if (usr) {
            dispatch(signIn({ email: usr.email, password: usr.password }));
          }
        }
      } catch (error: any) {
        console.error("Error fetching user:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    fetchExistUser();
  }, [dispatch]);

  if (isCheckingAuth || loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MyTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;

