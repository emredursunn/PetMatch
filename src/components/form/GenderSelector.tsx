import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import RadioButton from "./RadioButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FormikErrors } from "formik";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnimalFormState } from "../../types/AnimalFormState";

type Props = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
  error?: any;
};

const GenderSelector = ({ error, setFieldValue }: Props) => {
  const [selected, setSelected] = useState("male");

  useEffect(() => {
    setFieldValue("gender", selected);
  }, [selected]);

  return (
    <GestureHandlerRootView>
      <Text>Gender</Text>
      <View style={{ flexDirection: "row", gap: 12, alignItems:'center' }}>
        <RadioButton
          label="male"
          selectedValue={selected}
          setSelected={setSelected}
          value="male"
          icon={
            <Ionicons
              name={"male-sharp"}
              size={24}
              color={"rgba(78, 44, 191, 0.85)"}
            />
          }
        />
        <RadioButton
          label="female"
          selectedValue={selected}
          setSelected={setSelected}
          value="female"
          icon={
            <Ionicons
              name={"female-sharp"}
              size={24}
              color={"rgba(78, 44, 191, 0.85)"}
            />
          }
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </GestureHandlerRootView>
  );
};

export default GenderSelector;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
