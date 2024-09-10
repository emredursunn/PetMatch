import { StyleSheet, TouchableOpacity,  } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../../utils/constants";

type Props = {
  onPress: () => void;
};

const AddImageButton = ({ onPress }: Props) => {
  

  return (
    <TouchableOpacity onPress={onPress}
      style={{
        width: 100,
        height: 100,
        backgroundColor: colors.purple_700,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:16,
      }}
    >
      <AntDesign name="pluscircleo" size={48} color={colors.white} />
    </TouchableOpacity>
  );
};

export default AddImageButton;

const styles = StyleSheet.create({});
