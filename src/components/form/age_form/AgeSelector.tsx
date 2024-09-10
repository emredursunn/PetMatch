import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { FormikErrors } from "formik";
import { AnimalFormState } from "../../../types/Ad";
import { colors } from "../../../utils/constants";
import SelectBox from "../shared_form_components/SelectBox";

type Props = {
  value: any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
  error?: any;
};

const ageOptions = [
  { label: "0-3 months", value: "0-3 months" },
  { label: "3 months - 1 year", value: "3 months - 1 year" },
  { label: "1-3 years", value: "1-3 years" },
  { label: "3-6 years", value: "3-6 years" },
  { label: "6+ years", value: "6+ years" },
];

const AgeSelector = ({ value, setFieldValue, error }: Props) => {
  return (
    <View>
      <Text style={styles.label}>Age</Text>
      <View style={styles.optionsContainer}>
        {ageOptions.map((option, index) => (
          <Animated.View
            key={option.value}
            entering={FadeInDown.duration(300 * index)}
          >
            <SelectBox
              value={option.value}
              setSelected={() => setFieldValue("age", option.value)}
              selectedValue={value}
              customStyle={[styles.option]}
            >
              <Text
                style={[
                  styles.optionLabel,
                  value === option.value && styles.selectedOptionLabel,
                ]}
              >
                {option.label}
              </Text>
            </SelectBox>
          </Animated.View>
        ))}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default AgeSelector;

const styles = StyleSheet.create({
  pickerContainer: {
    marginVertical: 16,
  },
  label: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  option: {
    borderWidth: 0.5,
    borderColor: colors.purple_700,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 4,
    backgroundColor: colors.white,
  },
  selectedOption: {
    backgroundColor: colors.purple_700,
  },
  optionLabel: {
    fontSize: 14,
    color: colors.black,
  },
  selectedOptionLabel: {
    color: colors.white,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});
