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
      <View style={styles.row}>
        <Text style={styles.name}>{data.name}</Text>
        <CustomBox>
          <Ionicons
            name={data.sex === "female" ? "female-sharp" : "male-sharp"}
            size={24}
            color={"rgba(78, 44, 191, 0.85)"}
          />
        </CustomBox>
      </View>
      <View style={{ overflow:'hidden', flexWrap:'wrap' ,flexDirection: "row", gap: 12 }}>
        <CustomBox>
          <Text style={styles.text}>{data.age}</Text>
        </CustomBox>
        <CustomBox>
          <Text style={styles.text}>{data.color}</Text>
        </CustomBox>
        <CustomBox>
          <Text style={styles.text}>{data.species}</Text>
        </CustomBox>
      </View>
      <Text>1.2 km</Text>
      {/* buraya konum uzaklığı gelicek */}
    </View>
  );
};

export default DetailedPet;

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    alignSelf: "center",
    top:'30%',
    backgroundColor: "#fff",
    width: "90%",
    borderRadius:20,
    padding:24,
    justifyContent: "center",
    gap: 12,
    zIndex:1
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "rgba(78, 44, 191, 0.85)",
    fontSize: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: -1,
  },
});
