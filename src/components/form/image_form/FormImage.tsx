import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from "../../../utils/constants";

type Props = {
  imgUri: string;
  index: number;
  onRemove: () => void;
};

const FormImage = ({ imgUri, onRemove }: Props) => {
  return (
    <View
      style={{
        width: 150,
        height: 150,
        borderRadius: 16,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: colors.purple_700,
      }}
    >
      <TouchableWithoutFeedback>
        <Image
          source={{ uri: imgUri }}
          style={{ width: "100%", height: "100%", borderRadius: 16 }}
          resizeMode="stretch"
        />
      </TouchableWithoutFeedback>
      <MaterialIcons
        onPress={onRemove}
        name="delete-forever"
        size={24}
        color={colors.red}
        style={styles.deleteIcon}
      />
    </View>
  );
};

export default FormImage;

const styles = StyleSheet.create({
  deleteIcon: {
    position: "absolute",
    top: 1,
    right: 1,
  },
});
