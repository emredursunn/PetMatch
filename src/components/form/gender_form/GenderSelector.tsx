import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectBox from "../shared_form_components/SelectBox";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FormikErrors } from "formik";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnimalFormState } from "../../../types/AnimalFormState";
import { colors } from "../../../utils/constants";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

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
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  useEffect(() => {
    setFieldValue("gender", selectedGender);
  }, [selectedGender]);

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT * 0.6, justifyContent:'center' }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 36,
          fontWeight: "700",
          letterSpacing: -1,
          marginBottom: 30,
        }}
      >
        Evcil hayvanınızın cinsiyeti nedir?
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <SelectBox
          selectedValue={value}
          setSelected={setSelectedGender}
          value="male"
          customStyle={styles.selectBtn}
        >
          <Ionicons
            name={"male-sharp"}
            size={48}
            color={selectedGender === "male" ? colors.white : colors.purple}
          />
          <Text
            style={{
              color: selectedGender === "male" ? colors.white : colors.purple,
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
        >
          <Ionicons
            name={"female-sharp"}
            size={48}
            color={selectedGender === "female" ? colors.white : colors.purple}
          />
          <Text
            style={{
              color: selectedGender === "female" ? colors.white : colors.purple,
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
