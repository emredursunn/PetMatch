import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AnimalData } from "../../types/AnimalData";
import CustomBox from "./CustomBox";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  data: AnimalData;
};

const DetailedPet = ({ data }: Props) => {
  return (
    <View style={styles.box}>
      <View
        style={{
          overflow: "hidden",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 12,
        }}
      >
        <CustomBox>
          <Text style={styles.text}>{data.age}</Text>
        </CustomBox>
        <CustomBox>
          <View style={{flexDirection:'row', gap:4}}>
          {data.colors.map((color) => (
            <Text key={color} style={styles.text}>{color}</Text>
          ))}
          </View>
        </CustomBox>
        <CustomBox>
          <Text style={styles.text}>{data.species}</Text>
        </CustomBox>
      </View>
      <Text style={[styles.text, {paddingLeft:6}]}>1.2 km away</Text>
      {/* buraya konum uzaklığı gelicek */}
    </View>
  );
};

export default DetailedPet;

const styles = StyleSheet.create({
  box: {
    width: "90%",
    borderRadius: 20,
    padding: 12,
    justifyContent: "center",
    gap: 12,
  },
  text: {
    color: "rgba(78, 44, 191, 0.85)",
    fontSize: 16,
  },
});
