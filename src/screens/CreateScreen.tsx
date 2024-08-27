import React from "react";
import { useWindowDimensions, View } from "react-native";
import MultiStepForm from "../components/form/MultiStepForm";

const CreateScreen = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  return (
    <View style={{ flexGrow: 1 }}>
      <MultiStepForm />
    </View>
  );
};

export default CreateScreen;
