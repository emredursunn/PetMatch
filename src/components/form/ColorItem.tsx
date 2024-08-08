import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Color } from "../../types/AnimalFormState";

type Props = {
  color: Color;
  setSelectedColors: React.Dispatch<React.SetStateAction<Color[]>>;
  selectedColors: Color[];
};

const ColorItem = ({ color, setSelectedColors, selectedColors }: Props) => {
  const isSelected = selectedColors.includes(color);

  const handleOnPress = () => {
    if (isSelected) {
      setSelectedColors(() => selectedColors.filter((c) => c !== color));
    } else if (selectedColors.length < 2) {
      setSelectedColors((prev) => [...prev, color]);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[styles.item, { backgroundColor: color.code }]}
    >
      {isSelected && (
        <View style={[styles.item ]}>
          <AntDesign name="check" size={24} color={color.name !== "black" ? "rgba(78, 44, 191)" : "white"} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  item: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems:'center',
    justifyContent:'center',
  },
});
