import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  currentPageIndex: SharedValue<number>;
  index: number;
};

const Dot = ({ currentPageIndex, index }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      currentPageIndex.value,
      [index - 1, index, index + 1],
      [10, 30, 10],
      Extrapolation.CLAMP
    );
    const backgroundColor = interpolateColor(
      currentPageIndex.value,
      [index -1, index, index+1],
      ['lightgray','white','lightgray'],
    )

    return {
      width,
      backgroundColor
    };
  });
  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});
