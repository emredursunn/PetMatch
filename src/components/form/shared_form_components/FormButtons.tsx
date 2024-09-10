import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  showToast,
  validateStepManually,
} from "../../../utils/helperFunctions";
import { colors } from "../../../utils/constants";
import { AnimalFormState } from "../../../types/Ad";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  step: number;
  values: AnimalFormState;
  handlePrev: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
};

const FormButtons = ({
  step,
  values,
  handlePrev,
  handleNext,
  handleSubmit,
}: Props) => (
  <View style={styles.buttonContainer}>
    {/* BACK */}
    {step > 1 && (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handlePrev();
        }}
      >
        <MaterialIcons name="arrow-back-ios-new" size={24} color={colors.white} />
      </TouchableOpacity>
    )}

    {/* NEXT */}
    {step < 6 && (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (validateStepManually(step, values)) {
            handleNext();
          } else {
            showToast("error", "Bilgiler eksik", "Bilgileri eksiksiz giriniz");
          }
        }}
      >
        <MaterialIcons name="arrow-forward-ios" size={24} color={colors.white} />
      </TouchableOpacity>
    )}

    {/* SUBMIT */}
    {step === 6 && (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (validateStepManually(step, values)) {
            handleSubmit();
          } else {
            showToast("error", "Bilgiler eksik", "Bilgileri eksiksiz giriniz");
          }
        }}
      >
        <MaterialIcons name="pets" size={24} color={colors.white} />
      </TouchableOpacity>
    )}
  </View>
);

export default FormButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    height: 60,
    width: "40%",
    backgroundColor: colors.purple_500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
