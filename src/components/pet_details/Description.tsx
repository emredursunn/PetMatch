import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AnimalData } from "../../types/AnimalData";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomBox from "./CustomBox";
import { makePhoneCall } from "../../utils/helperFunctions";

type Props = {
  data: AnimalData;
};

const Description = ({ data }: Props) => {
  return (
    <View style={{ paddingTop: "45%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 18,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image
            source={{
              uri: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2100",
            }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 18 }}>Emre Dursun</Text>
        </View>
        <TouchableOpacity onPress={() => makePhoneCall(data.contact)}>
        <CustomBox>
          <Ionicons name="call-sharp" size={24} color="rgba(78, 44, 191, 0.72)" />
        </CustomBox>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16, paddingTop:40 }}>
        <Text style={{ fontSize: 18,  }}>{data.description}</Text>
      </View>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({});