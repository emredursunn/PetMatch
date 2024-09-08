import { StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Color } from "../../../types/AnimalFormState";
import { colors } from "../../../utils/constants";
import Animated, { FadeInDown } from "react-native-reanimated";

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
  // Determine if the color is selected by comparing object properties
  const isSelected = selectedColors.some(
    (c) => c.code === color.code && c.name === color.name
  );

  const handleOnPress = () => {
    // Toggle the color selection
    if (isSelected) {
      setSelectedColors((prev) => prev.filter(
        (c) => c.code !== color.code || c.name !== color.name
      ));
    } else if (selectedColors.length < 2) {
      setSelectedColors((prev) => [...prev, color]);
    }
  };

  return (
    <Animated.View
      style={[styles.item, { backgroundColor: color.code }]}
      entering={FadeInDown.delay(75 * index)}
    >
      <TouchableOpacity
        onPress={handleOnPress}
        style={styles.touchable}
      >
        {isSelected && (
          <View style={styles.checkmarkContainer}>
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
    borderRadius: 40, // Adjusted for better visual appearance
    alignItems: "center",
    justifyContent: "center",
    margin: 4, // Added margin for better spacing
  },
  touchable: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkContainer: {
    ...StyleSheet.absoluteFillObject, // Fill the entire area for the checkmark
    alignItems: "center",
    justifyContent: "center",
  },
});
