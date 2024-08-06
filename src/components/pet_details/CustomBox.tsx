import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CustomBox = ({ children }: Props) => {
  return <View style={styles.box}>{children}</View>;
};

export default CustomBox;

const styles = StyleSheet.create({
    box:{
        backgroundColor:'rgba(226, 220, 223, 0.8)',
        paddingVertical:6,
        paddingHorizontal:18,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    }
});
