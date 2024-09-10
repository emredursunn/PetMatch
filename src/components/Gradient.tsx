import { StyleSheet} from "react-native";
import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: ReactNode;
};

const Gradient = ({ children }: Props) => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#CAD0FF", "#E3E3E3"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;

const styles = StyleSheet.create({});

// colors={["#CAD0FF", "#E3E3E3"]}
