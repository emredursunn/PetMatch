import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/form/shared_form_components/CustomInput";
import { colors } from "../../utils/constants";
import Gradient from "../../components/Gradient";
import LottieView from "lottie-react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signUp } from "../../store/authSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigation/AuthStack";

export const SignUpScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParams, "SignUp">>();

  const handleSignUp = () => {
    dispatch(signUp({ fullName, email, password, phone }));
  };

  return (
    <Gradient>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 8,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <LottieView
          source={{
            uri: "https://lottie.host/7bc9d684-d0c1-4d4b-ab4c-4331fd4bfc6c/VerDrTB3pl.json",
          }}
          style={{ width: 150, height: 210, alignSelf: "center" }}
          resizeMode="cover"
          autoPlay
          loop
        />
        <Text style={{ textAlign: "center", fontSize: 36, fontWeight: "bold" }}>
          Miyav!
        </Text>
        <CustomInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter name"
          inputStyle={styles.input}
        />
        <CustomInput
          value={email}
          placeholder="Enter email"
          onChangeText={setEmail}
          inputStyle={styles.input}
          textContentType="emailAddress"
          keyboardType="email-address"
          inputMode="email"
        />
        <CustomInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          inputStyle={styles.input}
        />
        <CustomInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          inputStyle={styles.input}
          inputMode="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
        />
        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 16,
            backgroundColor: colors.purple_700,
            borderRadius: 16,
            marginVertical: 34,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 16 }}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignSelf: "center", gap: 4 }}>
          <Text>Already a member?</Text>
          <TouchableOpacity onPress={() => navigate("SignIn")}>
            <Text style={{ color: colors.purple_800 }}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Gradient>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  input: {
    shadowColor: colors.black,
    elevation: 10,
    shadowOffset: { width: 5, height: 5 },
  },
});
