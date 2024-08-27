import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import SelectButton from "../shared_form_components/SelectButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FormikErrors } from "formik";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnimalFormState } from "../../../types/AnimalFormState";
import LottieView from "lottie-react-native";
import { animalTypes, colors } from "../../../utils/constants";

type Props = {
  value: any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
  error?: any;
  onBlur: () => void;
};

const AnimalTypeSelector = ({ setFieldValue, value, error, onBlur }: Props) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setFieldValue("animalType", selected);
  }, [selected]);

  return (
    <GestureHandlerRootView
      style={{ height: "100%", width: "100%" }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 36,
          fontWeight: "700",
          letterSpacing: -1,
          marginVertical: 20,
        }}
      >
        Evcil hayvanınız nedir?
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          height: "100%",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {Object.entries(animalTypes).map(([key, animal]) => (
          <View key={key} style={{ alignItems: "center", width: "40%",height:'30%', marginVertical:20 }}>
            <Text style={styles.name}>{animal.name}</Text>
            <SelectButton
              selectedValue={value}
              setSelected={setSelected}
              value={key}
              customStyle={styles.selectBtn}
            >
              <LottieView
                source={{
                  uri: animal.lottie,
                }}
                style={{ width: "100%", height: "80%" }}
                resizeMode="contain"
                autoPlay
                loop
              />
            </SelectButton>
          </View>
        ))}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </GestureHandlerRootView>
  );
};

export default AnimalTypeSelector;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  selectBtn: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    shadowOpacity: 0.4,
  },
  name: { fontSize: 24, fontWeight: "bold" },
});
