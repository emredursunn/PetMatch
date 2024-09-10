import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  showToast,
  validateStepManually,
} from "../../../utils/helperFunctions";
import { colors } from "../../../utils/constants";
import { AnimalFormState } from "../../../types/Ad";

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
        <Text style={styles.buttonText}>Back</Text>
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
        <Text style={styles.buttonText}>Next</Text>
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
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default FormButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: "20%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    height: 60,
    width: "40%",
    backgroundColor: colors.purple_500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
