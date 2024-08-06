import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import Dot from "./Dot";

type Props = {
  currentPageIndex: SharedValue<number>;
  data: string[];
};

const Pagination = ({ currentPageIndex, data }: Props) => {
  return (
    <View style={styles.pagination}>
      {data.map((_, index) => (
        <Dot key={index} index={index} currentPageIndex={currentPageIndex} />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: '20%',
    alignSelf: "center",
    zIndex:1
  },
});
