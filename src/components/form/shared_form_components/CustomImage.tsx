import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  imageUri: string;
  index: number;
  remove: (index: number) => void;
};

const CustomImage = ({ imageUri, index, remove }: Props) => {
  const handleRemove = () => {
    remove(index);
  };

  return (
    <View style={{ width: '40%', height: 150, borderRadius: 12 }}>
      <MaterialIcons
        name="delete-outline"
        size={40}
        color="black"
        onPress={handleRemove}
        style={{ position: "absolute", top: 5, right: -30, zIndex:1 }}
      />
      <Image
        source={{ uri: imageUri }}
        style={{ width: "100%", height: "100%", borderRadius: 12 }}
        resizeMode="stretch"
      />
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({});
