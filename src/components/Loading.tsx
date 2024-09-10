import LottieView from "lottie-react-native";
import { View } from "react-native";
import Gradient from "./Gradient";

export const LoadingScreen = () => {
  return (
    <Gradient>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={{
            uri: "https://lottie.host/09b99adb-923c-4e9b-a4bf-31785e347918/uQ9VwWugl4.json",
          }}
          style={{ width: 300, height: 300 }}
          resizeMode="cover"
          autoPlay
          loop
        />
      </View>
    </Gradient>
  );
};
