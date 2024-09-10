import { StyleSheet, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { colors } from "../../utils/constants";

type Props = {
  children: ReactNode;
  customStyle?:ViewStyle
};

const CustomBox = ({ children,customStyle }: Props) => {
  return <View style={[styles.box, customStyle]}>{children}</View>;
};

export default CustomBox;

const styles = StyleSheet.create({
    box:{
        backgroundColor:colors.bottom_background,
        paddingVertical:6,
        paddingHorizontal:18,
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
    }
});
