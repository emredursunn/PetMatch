import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  color: TextStyle["color"];
  name: string;
};

const ColorItem = ({ color, name }: Props) => {
  return (
    <TouchableOpacity style={[styles.item, { backgroundColor: color }]}>
      <View style={[styles.item, { backgroundColor: "rgba(0,0,0,0.1)" }]}>
        <AntDesign name="check" size={15} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  item: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
