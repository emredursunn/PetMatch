import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomBox from "./CustomBox";
import { AnimalData } from "../../types/AnimalData";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  data: AnimalData;
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
      colors={["transparent", "white"]}
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
            color={"black"}
          />
        </CustomBox>
      </View>
    </LinearGradient>
  );
};

export default Gradient;
