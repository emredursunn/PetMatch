import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Color } from "../../../types/AnimalFormState";
import { colors } from "../../../utils/constants";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";

type Props = {
  color: Color;
  index: number;
  setSelectedColors: React.Dispatch<React.SetStateAction<Color[]>>;
  selectedColors: Color[];
};

const ColorItem = ({
  color,
  index,
  setSelectedColors,
  selectedColors,
}: Props) => {
  const isSelected = selectedColors.includes(color);

  const handleOnPress = () => {
    if (isSelected) {
      setSelectedColors(() => selectedColors.filter((c) => c !== color));
    } else if (selectedColors.length < 2) {
      setSelectedColors((prev) => [...prev, color]);
    }
  };

  return (
    <Animated.View
      style={[styles.item, { backgroundColor: color.code }]}
      entering={FadeInDown.delay(75 * index)}
    >
      <TouchableOpacity onPress={handleOnPress} style={{width:'100%',height:'100%'}}>
        {isSelected && (
          <View style={[styles.item]}>
            <AntDesign
              name="check"
              size={24}
              color={color.name !== colors.black ? colors.purple : colors.white}
            />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  item: {
    width: 80,
    height: 80,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});
