import { StyleSheet, Text, View } from "react-native";
import CustomInput from "../shared_form_components/CustomInput";
import { FormikErrors } from "formik";
import { AnimalFormState, ILocation } from "../../../types/Ad";
import Animated, { FadeOutDown, SlideInRight } from "react-native-reanimated";

type Props = {
  value: Omit<ILocation, "coordinates">;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
  error?: any;
};

const LocationSelector = ({ value, setFieldValue, error }: Props) => {
  const handleChange =
    (field: keyof Omit<ILocation, "coordinates">) => (text: string) => {
      setFieldValue(`location.${field}`, text);
    };

  return (
    <Animated.ScrollView
      entering={SlideInRight}
      exiting={FadeOutDown}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.label}>Lastly enter location...</Text>
      <CustomInput
        label="City"
        value={value.city}
        onChangeText={handleChange("city")}
        placeholder="Istanbul"
        containerStyle={{ width: "80%", margin: 6 }}
      />
      <CustomInput
        label="District"
        value={value.district}
        onChangeText={handleChange("district")}
        placeholder="Besiktas"
        containerStyle={{ width: "80%", margin: 6 }}
      />
      <CustomInput
        label="Street"
        value={value.street}
        onChangeText={handleChange("street")}
        placeholder="Ortakoy"
        containerStyle={{ width: "80%", margin: 6 }}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </Animated.ScrollView>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    marginVertical: 16,
    width: "100%",
    alignItems: "center",
    justifyContent:'center',
    paddingBottom:20
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
  label: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 24,
  },
});
