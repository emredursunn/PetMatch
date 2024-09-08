import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
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
import { showToast } from "../../utils/helperFunctions";
import BreedSelector from "./breed_from/BreedSelector";
import AnimalTypeSelector from "./animal_type_form/AnimalTypeSelector";
import Animated, {
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import AddImageButton from "./image_form/AddImageButton";
import FormImage from "./image_form/FormImage";
import Gradient from "../Gradient";
import FormButtons from "./shared_form_components/FormButtons";
import { Ad } from "../../types/Ad";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { createAd, updateAd } from "../../store/adSlice";

type Props = {
  editingAd?: Ad;
  setEditingAd?: React.Dispatch<React.SetStateAction<Ad | null>>;
};

const MultiStepForm = ({ editingAd, setEditingAd }: Props) => {
  const [step, setStep] = useState(1);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const submit = async (
    formState: AnimalFormState,
    { resetForm }: FormikHelpers<AnimalFormState>
  ) => {
    try {
      const randomUUID = uuid.v4().toString();
      const ad = {
        id: editingAd?.id || randomUUID, // Assign the generated UUID
        userId: user!.uid,
        animalType: formState.animalType, // Ensure type compatibility
        title: formState.title,
        age: formState.age || "", // Default to empty string if not provided
        gender: formState.gender,
        breed: formState.breed,
        colors: formState.colors, // Assuming colors are of type Color and need to be converted to strings
        images: formState.images, // Mapping images to images
        contact: user!.phone, // Default to empty string if not provided
        description: formState.description,
      } as Ad;
      if (editingAd && setEditingAd) {
        dispatch(updateAd(ad));
        showToast(
          "success",
          "Başarılı",
          "İlanınız başarıyla güncellendi",
          5000
        );
        setEditingAd(null);
      } else {
        dispatch(createAd(ad));
        showToast("success", "Başarılı", "İlanınız başarıyla eklendi", 8000);
      }
      resetForm();
      setStep(1);
    } catch (error: any) {
      showToast("error", "ilan verilemedi", error);
      throw new Error(error);
    }
  };

  return (
    <Formik
      initialValues={
        {
          step: step,
          animalType: editingAd?.animalType || "",
          title: editingAd?.title || "",
          age: editingAd?.age || "",
          breed: editingAd?.breed || "",
          gender: editingAd?.gender || "",
          description: editingAd?.description || "",
          colors: editingAd?.colors || [],
          images: editingAd?.images || [],
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
          if (values.images.length < 3) {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              const newimages = [...values.images, result.assets[0].uri];
              setFieldValue("images", newimages);
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
          const newimages = values.images.filter((p, i) => i !== index);
          setFieldValue("images", newimages);
        };

        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
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
                      <Animated.ScrollView
                        entering={SlideInRight}
                        exiting={FadeOut}
                        contentContainerStyle={{
                          width: "100%",
                          padding: 10,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 32,
                            fontWeight: "700",
                            textAlign: "center",
                            marginVertical: 50,
                          }}
                        >
                          ÇOKKK AZ KALDI...
                        </Text>

                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#333",
                            marginBottom: 5,
                          }}
                        >
                          Fotoğraf Ekle
                        </Text>
                        <ScrollView
                          showsHorizontalScrollIndicator={false}
                          horizontal
                          contentContainerStyle={{
                            marginVertical: 8,
                          }}
                        >
                          <AddImageButton
                            key={"add-image"}
                            onPress={pickImage}
                          />

                          {values.images.map((image, index) => (
                            <FormImage
                              key={index}
                              imgUri={image}
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
                      </Animated.ScrollView>
                    )}
                  </View>

                  {/* BUTTONS */}
                  <FormButtons
                    step={step}
                    values={values}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    handleSubmit={handleSubmit}
                  />
                </View>
              </Gradient>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        );
      }}
    </Formik>
  );
};

export default MultiStepForm;
