import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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
import BreedSelector from "./breed_from/BreedSelector";
import AnimalTypeSelector from "./animal_type_form/AnimalTypeSelector";
import Animated, {  FadeOut, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import AddImageButton from "./image_form/AddImageButton";
import FormImage from "./image_form/FormImage";
import Gradient from "../Gradient";

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
    setStep(1)
  };

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
            <Gradient>
            <View
              style={{
                paddingBottom: 100,
              }}
            >
              <View
                style={{
                  height: "80%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {step === 1 && (
                  <AnimalTypeSelector
                    setFieldValue={setFieldValue}
                    value={values.animalType}
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
                  <Animated.View
                    entering={SlideInRight}
                    exiting={SlideOutLeft}
                    style={{
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
                    <ColorSelector
                      value={values.colors}
                      setFieldValue={setFieldValue}
                      error={touched.colors && errors.colors}
                    />
                  </Animated.View>
                )}

                {step === 5 && (
                  <Animated.View entering={SlideInRight} exiting={FadeOut} style={{ width: "100%", padding: 10, justifyContent:'center' }}>
                    <Text
                      style={{
                        fontSize: 32,
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom:50
                      }}
                    >
                      ÇOKKK AZ KALDI...
                    </Text>

                    <Text style={styles.label}>Fotoğraf Ekle</Text>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      contentContainerStyle={{
                        marginVertical: 8,
                      }}
                    >
                      <AddImageButton key={"add-image"} onPress={pickImage} />

                      {values.photos.map((photo, index) => (
                        <FormImage
                          key={index}
                          imgUri={photo}
                          index={index}
                          onRemove={() => removePhoto(index)}
                        />
                      ))}
                    </ScrollView>

                    <CustomInput
                      label="Description"
                      value={values.description}
                      onChangeText={handleChange("description")}
                      placeholder="Çok sevecen huylu, oyuncu biir kedidir. Onun yeni kahramanı olur musun?"
                      onTouchStart={handleBlur("description")}
                      multiline
                      numberOfLines={6}
                      style={{
                        width: "90%",
                        backgroundColor: colors.white,
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: colors.purple_700,
                        padding: 12,
                      }}
                      textAlignVertical="top"
                      error={touched.description && errors.description}
                    />
                  </Animated.View>
                )}
              </View>

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
                          "İlanınız başarıyla eklendi",
                          8000
                        );
                      } else {
                        showToast(
                          "error",
                          "Bilgiler eksik",
                          "Bİlgileri eksiksiz giriniz",
                        );
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            </Gradient>
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
    height: "20%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    height: "40%",
    width: "40%",
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
  label: {
    fontSize: 20,
    fontWeight:'bold',
    color: "#333",
    marginBottom: 5,
  },
});
