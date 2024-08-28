import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FormikErrors } from "formik";
import { catColors } from "../../../utils/constants";
import { AnimalFormState, Color } from "../../../types/AnimalFormState";
import ColorItem from "./ColorItem";

type Props = {
  value: Color[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
  error?: any;
};

const ColorSelector = ({ value, setFieldValue, error }: Props) => {
  const [selectedColors, setSelectedColors] = useState<Color[]>(value);

  useEffect(() => {
    setFieldValue("colors", selectedColors);
    console.log(selectedColors);
  }, [selectedColors]);

  return (
    <View>
      <Text style={{fontSize:20, fontWeight:'bold', marginVertical:24}}>Renk</Text>
      <View style={{ flexDirection: "row", gap: 8, flexWrap:'wrap' }}>
        {catColors.map((color, index) => (
          <ColorItem
            key={index}
            color={color}
            index={index}
            setSelectedColors={setSelectedColors}
            selectedColors={selectedColors}
          />
        ))}
      </View>
    </View>
  );
};

export default ColorSelector;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
