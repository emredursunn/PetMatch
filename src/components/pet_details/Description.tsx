import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ad } from "../../types/Ad";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomBox from "./CustomBox";
import { makePhoneCall } from "../../utils/helperFunctions";
import { colors } from "../../utils/constants";

type Props = {
  ad: Ad;
};

const Description = ({ ad }: Props) => {
  return (
    <View style={{width:'100%', alignSelf:'center',paddingTop: 20, borderColor:colors.purple_700, borderRadius:16 }}>
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
        <TouchableOpacity onPress={() => makePhoneCall(ad.contact)}>
        <CustomBox>
          <Ionicons name="call-sharp" size={24} color={colors.purple_700} />
        </CustomBox>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16, paddingTop:40 }}>
        <Text style={{ fontSize: 18,  }}>{ad.description}</Text>
      </View>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({});
