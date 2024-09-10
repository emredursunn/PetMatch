import { ColorValue, Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { colors } from "../../../utils/constants";

type Props = {
  value: any;
  selectedValue: any;
  setSelected: (value: any) => void;
  children: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  selectedColor?: ColorValue
};

const SelectBox = ({
  value,
  selectedValue,
  setSelected,
  children,
  customStyle,
  selectedColor
}: Props) => {
  const isSelected = selectedValue === value;
  return (
    <Pressable
      onPress={() => setSelected(value)}
      style={[
        customStyle,
        isSelected && { backgroundColor: selectedColor || colors.purple_500 },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default SelectBox;

