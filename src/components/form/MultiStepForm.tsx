import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { validationSchema } from "../../utils/formUtils/yup";
import * as ImagePicker from "expo-image-picker";
import CustomInput from "./shared_form_components/CustomInput";
import GenderSelector from "./gender_form/GenderSelector";
import ColorSelector from "./color_form/ColorSelector";
import { showToast } from "../../utils/helperFunctions";
import BreedSelector from "./breed_from/BreedSelector";
import AnimalTypeSelector from "./animal_type_form/AnimalTypeSelector";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import AddImageButton from "./image_form/AddImageButton";
import FormImage from "./image_form/FormImage";
import Gradient from "../Gradient";
import FormButtons from "./shared_form_components/FormButtons";
import { Ad, AnimalFormState } from "../../types/Ad";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { createAd, updateAd } from "../../store/adSlice";
import AgeSelector from "./age_form/AgeSelector";
import LocationSelector from "./location_form/LocationSelector";
import { colors } from "../../utils/constants";

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
        location: formState.location,
      } as Ad;
      if (editingAd && setEditingAd) {
        dispatch(updateAd(ad));
        showToast("success", "Success", "Ad is updated succesfully", 5000);
        setEditingAd(null);
      } else {
        dispatch(createAd(ad));
        showToast("success", "Success", "Ad is created succesfully", 8000);
      }
      resetForm();
      setStep(1);
    } catch (error: any) {
      showToast("error", "Error", error);
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
          location: editingAd?.location || {
            city: "",
            district: "",
            street: "",
          },
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
              "Maximum capacity",
              "Only 3 images can get load.."
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
                    {/* BUTTONS */}
                    <FormButtons
                      step={step}
                      values={values}
                      handlePrev={handlePrev}
                      handleNext={handleNext}
                      handleSubmit={handleSubmit}
                    />
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
                      <Animated.ScrollView
                        entering={SlideInRight}
                        exiting={SlideOutLeft}
                        contentContainerStyle={{
                          width: "100%",
                          padding: 16,
                          paddingTop: 36,
                          paddingBottom: 200,
                          gap: 16,
                          justifyContent: "center",
                        }}
                      >
                        <CustomInput
                          label="Name"
                          value={values.title}
                          onChangeText={handleChange("title")}
                          placeholder="Animal Name"
                          onTouchStart={handleBlur("title")}
                        />

                        <AgeSelector
                          value={values.age}
                          setFieldValue={setFieldValue}
                          error={touched.age && errors.age}
                        />

                        <ColorSelector
                          value={values.colors}
                          setFieldValue={setFieldValue}
                          error={touched.colors && errors.colors}
                        />
                      </Animated.ScrollView>
                    )}

                    {step === 5 && (
                      <Animated.ScrollView
                        entering={SlideInRight}
                        exiting={SlideOutLeft}
                        contentContainerStyle={{
                          width: "100%",
                          padding: 10,
                          paddingBottom:150,
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
                          The last few steps...
                        </Text>

                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: colors.black,
                            marginBottom: 5,
                          }}
                        >
                          Add some photos.
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            width:'100%',
                            flexWrap: "wrap",
                            marginVertical: 8,
                            gap: 10,
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
                        </View>

                        <CustomInput
                          label="Let's Write something about it."
                          value={values.description}
                          onChangeText={handleChange("description")}
                          placeholder="Çok sevecen huylu, oyuncu biir kedidir. Onun yeni kahramanı olur musun?"
                          onTouchStart={handleBlur("description")}
                          multiline
                          numberOfLines={6}
                          inputStyle={{
                            width: "100%",
                            height: 100,
                          }}
                          textAlignVertical="top"
                          error={touched.description && errors.description}
                        />
                      </Animated.ScrollView>
                    )}
                    {step === 6 && (
                      <LocationSelector
                        value={values.location}
                        setFieldValue={setFieldValue}
                        error={touched.location && errors.location}
                      />
                    )}
              </Gradient>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        );
      }}
    </Formik>
  );
};

export default MultiStepForm;
