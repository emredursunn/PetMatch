import {  StyleSheet, Text,  } from "react-native";
import React from "react";
import { Breed } from "../../../types/Ad";
import SelectBox from "../shared_form_components/SelectBox";
import { colors } from "../../../utils/constants";

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
          fontSize: 14,
          fontWeight: "600",
          textAlign: "center",
          color: item.name === selectedValue ? colors.white : colors.black
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
    marginVertical:4,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    paddingLeft: 24,
    shadowColor:colors.transparent
  },
});
