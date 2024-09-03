import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomBox from "../pet_details/CustomBox";
import { colors } from "../../utils/constants";

const ConnectButtons = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 24,
      }}
    >
      <CustomBox customStyle={styles.connectBoxStyle}>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/google.png")}
            style={{ width: 30, height: 30, margin: 8 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </CustomBox>
      <CustomBox customStyle={styles.connectBoxStyle}>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/apple.png")}
            style={{ width: 30, height: 30, margin: 8 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </CustomBox>
      <CustomBox customStyle={styles.connectBoxStyle}>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/facebook.png")}
            style={{ width: 30, height: 30, margin: 8 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </CustomBox>
    </View>
  );
};

export default ConnectButtons;

const styles = StyleSheet.create({
  connectBoxStyle: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
