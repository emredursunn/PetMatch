import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { validationSchema } from "../../utils/formUtils/yup";
import * as ImagePicker from "expo-image-picker";
import CustomInput from "./shared_form_components/CustomInput";
import GenderSelector from "./gender_form/GenderSelector";
import { AnimalFormState } from "../../types/AnimalFormState";
import ColorSelector from "./color_form/ColorSelector";
import { colors } from "../../utils/constants";
import { showToast, validateStepManually } from "../../utils/helperFunctions";
import CustomImage from "./shared_form_components/CustomImage";
import BreedSelector from "./breed_from/BreedSelector";
import AnimalTypeSelector from "./animal_type_form/AnimalTypeSelector";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const submit = (
    formstate: AnimalFormState,
    { resetForm }: FormikHelpers<AnimalFormState>
  ) => {
    console.log(formstate);
    resetForm();
  };

  const ErrorMsg: React.FC<{ error: string }> = ({ error }) => (
    <View style={{ width: "75%", marginTop: 4 }}>
      <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>
    </View>
  );

  return (
    <Formik
      initialValues={
        {
          step: step,
          animalType: "",
          title: "",
          breed: "",
          gender: "",
          description: "",
          colors: [],
          photos: [],
        } as AnimalFormState
      }
      onSubmit={submit}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit,
        handleChange,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        isValid,
        dirty,
        values,
      }: FormikProps<AnimalFormState>) => {
        const pickImage = async () => {
          if (values.photos.length < 3) {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              const newPhotos = [...values.photos, result.assets[0].uri];
              setFieldValue("photos", newPhotos);
            }
          } else {
            showToast(
              "info",
              "Kapasite dolu",
              "En fazla 3 resim yüklenebilir."
            );
          }
        };

        const removePhoto = (index: number) => {
          const newPhotos = values.photos.filter((p, i) => i !== index);
          setFieldValue("photos", newPhotos);
        };

        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingBottom: 300,
                paddingHorizontal: 5,
                top: 50,
              }}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
              >
                {step === 1 && (
                  <AnimalTypeSelector
                    setFieldValue={setFieldValue}
                    value={values.animalType}
                    onBlur={() => handleBlur("animalType")}
                  />
                )}

                {step === 2 && (
                  <BreedSelector
                    animalType={values.animalType}
                    value={values.breed}
                    setFieldValue={setFieldValue}
                  />
                )}

                {step === 3 && (
                  <GenderSelector
                    value={values.gender}
                    setFieldValue={setFieldValue}
                  />
                )}

                {step === 4 && (
                  <View
                    style={{
                      marginTop: 50,
                      justifyContent: "center",
                      padding: 12,
                    }}
                  >
                    <CustomInput
                      label="Name"
                      value={values.title}
                      onChangeText={handleChange("title")}
                      placeholder="Animal Name"
                      onTouchStart={handleBlur("title")}
                    />
                    {touched.title && !values.title && (
                      <ErrorMsg error="İsim giriniz" />
                    )}

                    <ColorSelector
                      value={values.colors}
                      setFieldValue={setFieldValue}
                      error={touched.colors && errors.colors}
                    />
                    {values.colors.length < 1 && (
                      <ErrorMsg error="En az 1 renk seçiniz" />
                    )}
                  </View>
                )}

                {step === 5 && (
                  <View
                    style={{ flex: 1, justifyContent: "center", padding: 10 }}
                  >
                    <View style={{ marginVertical: 10 }}>
                      <Text style={{ fontSize: 20, fontWeight: "700" }}>
                        Photos
                      </Text>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          marginVertical: 8,
                          gap: 32,
                        }}
                      >
                        <TouchableOpacity
                          onPress={pickImage}
                          style={{
                            width: "40%",
                            height: 150,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: colors.white,
                            borderRadius: 12,
                          }}
                        >
                          <Text style={{ fontSize: 78, fontWeight: "400" }}>
                            +
                          </Text>
                        </TouchableOpacity>
                        {values.photos.map((photo, index) => (
                          <CustomImage
                            key={index}
                            imageUri={photo}
                            remove={removePhoto}
                            index={index}
                          />
                        ))}
                      </View>
                    </View>

                    <CustomInput
                      label="Description"
                      value={values.description}
                      onChangeText={handleChange("description")}
                      placeholder="Description"
                      onTouchStart={handleBlur("description")}
                      multiline
                      numberOfLines={10}
                      style={{
                        height: 200,
                        backgroundColor: colors.white,
                        borderRadius: 16,
                        padding: 12,
                      }}
                      textAlignVertical="top"
                      error={touched.description && errors.description}
                    />
                  </View>
                )}

                {/* BUTTONS */}
                <View style={styles.buttonContainer}>
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
                  {step < 5 && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        if (validateStepManually(step, values)) {
                          handleNext();
                        } else {
                          showToast(
                            "error",
                            "Bilgiler eksik",
                            "Bİlgileri eksiksiz giriniz"
                          );
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                  )}
                  {step === 5 && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        if (validateStepManually(step, values)) {
                          handleSubmit();
                          showToast(
                            "success",
                            "Başarılı",
                            "İlanınız başarıyla eklendi"
                          );
                        } else {
                          showToast(
                            "error",
                            "Bilgiler eksik",
                            "Bİlgileri eksiksiz giriniz"
                          );
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        );
      }}
    </Formik>
  );
};

export default MultiStepForm;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  button: {
    margin: 10,
    width: "40%",
    paddingVertical: 18,
    backgroundColor: colors.purple_500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
