import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectBox from "../shared_form_components/SelectBox";
import { FormikErrors } from "formik";
import { AnimalFormState } from "../../../types/AnimalFormState";
import LottieView from "lottie-react-native";
import { animalTypes, colors } from "../../../utils/constants";
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

const AnimalTypeSelector = ({ setFieldValue, value, error }: Props) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setFieldValue("animalType", selected);
  }, [selected]);

  return (
    <Animated.View style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT * 0.6, justifyContent:'center'}} entering={SlideInRight} exiting={SlideOutLeft}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 36,
          fontWeight: "700",
          letterSpacing: -1,
          marginVertical: 10,
        }}
      >
        Çocuğunuzun türü nedir?
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          height:'60%',
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {Object.entries(animalTypes).map(([key, animal]) => (
          <View
            key={key}
            style={{
              alignItems: "center",
              width: "40%",
              height: "40%",
              marginVertical: 20,
            }}
          >
            <Text style={styles.name}>{animal.name}</Text>
            <SelectBox
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
            </SelectBox>
          </View>
        ))}
      </View>
    </Animated.View>
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
    shadowColor: colors.purple_800,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    shadowOpacity: 0.4,
  },
  name: { fontSize: 24, fontWeight: "bold" },
});
