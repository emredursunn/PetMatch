import { Pressable, StyleSheet, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { colors } from "../../../utils/constants";

type Props = {
  value: any;
  selectedValue: any;
  setSelected: (value: any) => void;
  children: ReactNode;
  customStyle?: ViewStyle;
};

const SelectButton = ({
  value,
  selectedValue,
  setSelected,
  children,
  customStyle,
}: Props) => {
  const isSelected = selectedValue === value;
  return (
    <Pressable
      onPress={() => setSelected(value)}
      style={[
        customStyle,
        isSelected && { backgroundColor: colors.purple_500 },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default SelectButton;

