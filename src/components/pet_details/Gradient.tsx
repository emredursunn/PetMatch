import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomBox from "./CustomBox";
import { AnimalAd } from "../../types/AnimalAd";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../utils/constants";

type Props = {
  data: AnimalAd;
};

const Gradient = ({ data }: Props) => {
  return (
    <LinearGradient
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: 1,
        width: "100%",
        height: 75,
        justifyContent:'center'
    }}
      colors={[colors.transparent, colors.white]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{fontSize:28, color:"black", fontWeight:'semibold', letterSpacing:-1}}>{data.title}</Text>
        <CustomBox>
          <Ionicons
            name={data.gender === "female" ? "female-sharp" : "male-sharp"}
            size={28}
            color={colors.purple_700}
          />
        </CustomBox>
      </View>
    </LinearGradient>
  );
};

export default Gradient;
