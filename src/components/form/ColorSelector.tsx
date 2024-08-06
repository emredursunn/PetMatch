import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FormikErrors } from "formik";
import { AnimalFormState } from "../../screens/CreateScreen";
import { catColors } from "../../utils/constants";
import ColorItem from "./ColorItem";

type Props = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
  error: any;
};

const ColorSelector = ({ setFieldValue, error }: Props) => {
  return (
    <View>
      {catColors.map((color) => (
        <ColorItem name={color.name} color={color.color} />
      ))}
    </View>
  );
};

export default ColorSelector;

const styles = StyleSheet.create({});
