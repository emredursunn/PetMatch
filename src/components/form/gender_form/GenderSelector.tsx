import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectBox from "../shared_form_components/SelectBox";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FormikErrors } from "formik";
import { colors } from "../../../utils/constants";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { AnimalFormState } from "../../../types/Ad";

type Props = {
  value: any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
  error?: any;
};

const GenderSelector = ({ setFieldValue, value, error }: Props) => {
  const [selectedGender, setSelectedGender] = useState(value);

  useEffect(() => {
    setFieldValue("gender", selectedGender);
  }, [selectedGender]);

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 36,
          paddingHorizontal: 8,
          fontWeight: "700",
          letterSpacing: -1,
          marginBottom: 30,
        }}
      >
        Choose the gender
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          gap: 16,
          justifyContent:'center'
        }}
      >
        <SelectBox
          selectedValue={value}
          setSelected={setSelectedGender}
          value="male"
          customStyle={styles.selectBtn}
          selectedColor={colors.blue}
        >
          <Ionicons
            name={"male-sharp"}
            size={48}
            color={selectedGender === "male" ? colors.white : colors.blue}
          />
          <Text
            style={{
              color: selectedGender === "male" ? colors.white : colors.blue,
              fontSize: 24,
            }}
          >
            Male
          </Text>
        </SelectBox>
        <SelectBox
          selectedValue={selectedGender}
          setSelected={setSelectedGender}
          value="female"
          customStyle={styles.selectBtn}
          selectedColor={colors.pink}
        >
          <Ionicons
            name={"female-sharp"}
            size={48}
            color={selectedGender === "female" ? colors.white : colors.pink}
          />
          <Text
            style={{
              color: selectedGender === "female" ? colors.white : colors.pink,
              fontSize: 24,
            }}
          >
            Female
          </Text>
        </SelectBox>
      </View>
    </Animated.View>
  );
};

export default GenderSelector;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  selectBtn: {
    width: "40%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
  },
});
