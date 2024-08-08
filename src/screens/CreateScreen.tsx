import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  useWindowDimensions,
} from "react-native";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { validationSchema } from "../utils/formUtils/yup";
import * as ImagePicker from "expo-image-picker";
import CustomInput from "../components/form/CustomInput";
import GenderSelector from "../components/form/GenderSelector";
import { AnimalFormState } from "../types/AnimalFormState";
import ColorSelector from "../components/form/ColorSelector";
import LottieView from "lottie-react-native";

const CreateScreen = () => {

  const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = useWindowDimensions()

  const submit = (
    formstate: AnimalFormState,
    { resetForm }: FormikHelpers<AnimalFormState>
  ) => {
    console.log(formstate);
    resetForm();
  };

  const ErrorMsg: React.FC<{ error: string }> = ({ error }) => (
    <View style={{ width: "75%" }}>
      <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LottieView
          source={{
            uri: "https://lottie.host/430cfe6f-37d9-44b9-b4da-617cd70c96e4/AyDoKjt6xe.json",
          }}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT /2,
          }}
          autoPlay
        />
      <Formik
        initialValues={
          {
            title: "",
            breed: "",
            gender: "male",
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
          };

          return (
            <View style={{  padding: 5 }}>
              <CustomInput
                label="Name"
                value={values.title}
                onChangeText={handleChange("name")}
                placeholder="Animal Name"
                onTouchStart={handleBlur("name")}
                error={touched.title && errors.title}
              />

              <CustomInput
                label="Breed"
                value={values.breed}
                onChangeText={handleChange("breed")}
                placeholder="Breed"
                onTouchStart={handleBlur("breed")}
                error={touched.breed && errors.breed}
              />

              <GenderSelector
                setFieldValue={setFieldValue}
                error={touched.gender && errors.gender}
              />

              <CustomInput
                label="Description"
                value={values.description}
                onChangeText={handleChange("description")}
                placeholder="Description"
                onTouchStart={handleBlur("description")}
                multiline
                error={touched.description && errors.description}
              />

              <ColorSelector
                setFieldValue={setFieldValue}
                error={touched.colors && errors.colors}
              />

              <View style={{ marginVertical: 10 }}>
                <Text>Photos</Text>
                {errors.photos && <ErrorMsg error={errors.photos as string} />}
                {values.photos.map((photo, index) => (
                  <Image
                    key={index}
                    source={{ uri: photo }}
                    style={{ width: 100, height: 100, margin: 5 }}
                  />
                ))}
                <Button title="Upload Photo" onPress={pickImage} />
              </View>

              <Button
                disabled={!isValid || !dirty}
                title="Submit"
                onPress={() => handleSubmit()}
              />
           
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default CreateScreen;
