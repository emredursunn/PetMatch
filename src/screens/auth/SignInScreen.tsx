import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomInput from "../../components/form/shared_form_components/CustomInput";
import CustomBox from "../../components/pet_details/CustomBox";
import { colors } from "../../utils/constants";
import Gradient from "../../components/Gradient";
import ConnectButtons from "../../components/auth/ConnectButtons";

export const SignInScreen = () => {
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
        <Text style={{ textAlign: "center", fontSize: 36, fontWeight: "bold" }}>
          Hello Again!
        </Text>
        <Text style={{ textAlign: "center", fontSize: 24 }}>
          Welcome back you've been missed!
        </Text>
        <CustomInput placeholder="Enter username" inputStyle={styles.input} />
        <CustomInput
          placeholder="Password"
          secureTextEntry
          inputStyle={styles.input}
        />
        <Text style={{ textAlign: "right" }}>Forget Password?</Text>
        <TouchableOpacity
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
          <Text style={{ color: colors.white, fontSize: 16 }}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Or</Text>
        
        <ConnectButtons />

        <View style={{ flexDirection: "row", alignSelf: "center", gap: 4 }}>
          <Text>Not a member?</Text>
          <TouchableOpacity>
            <Text style={{ color: colors.purple_800 }}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Gradient>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  input: {
    shadowColor: colors.black,
    elevation: 10,
    shadowOffset: { width: 5, height: 5 },
  },
});
