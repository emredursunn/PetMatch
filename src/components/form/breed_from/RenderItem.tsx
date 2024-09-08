import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Breed } from "../../../types/Ad";
import SelectBox from "../shared_form_components/SelectBox";

type Props = {
  item: Breed;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
};

const RenderItem = ({ item, selectedValue, setSelectedValue }: Props) => {
  return (
    <SelectBox
      key={item.name}
      value={item.name}
      selectedValue={selectedValue}
      setSelected={setSelectedValue}
      customStyle={styles.customStyle}
    >
      <Text
        style={{
          margin: 4,
          fontSize: 12,
          fontWeight: "600",
          textAlign: "center",
        }}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </SelectBox>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  customStyle: {
    width: "100%",
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    paddingLeft: 24,
  },
});
