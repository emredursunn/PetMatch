import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomBox from "../pet_details/CustomBox";

type Props = {
  label: string;
  value: string;
  icon: any;
  selectedValue: string;
  setSelected: (value: string) => void;
};

const RadioButton = ({
  label,
  icon,
  value,
  selectedValue,
  setSelected,
}: Props) => {
  const isSelected = selectedValue === value;
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <TouchableOpacity
        onPress={() => setSelected(value)}
        style={[styles.radioCircle, isSelected && styles.selected]}
      />
      <CustomBox>{icon}</CustomBox>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(78, 44, 191, 0.42)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selected: {
    backgroundColor: "rgba(78, 44, 191, 0.42)",
    padding: 2,
  },
});
