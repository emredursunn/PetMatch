import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FormikErrors } from "formik";
import { catColors } from "../../utils/constants";
import ColorItem from "./ColorItem";
import { AnimalFormState, Color } from "../../types/AnimalFormState";

type Props = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
  error?: any;
};

const ColorSelector = ({ setFieldValue, error }: Props) => {
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);

  useEffect(() => {
    setFieldValue("colors", selectedColors);
    console.log(selectedColors);
  }, [selectedColors]);

  return (
    <View>
      <Text>Renk</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {catColors.map((color, index) => (
          <ColorItem
            key={index}
            color={color}
            setSelectedColors={setSelectedColors}
            selectedColors={selectedColors}
          />
        ))}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
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
