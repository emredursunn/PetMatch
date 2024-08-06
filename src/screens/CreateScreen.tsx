import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { validationSchema } from "../utils/formUtils/yup";
import * as ImagePicker from "expo-image-picker";
import CustomInput from "../components/form/CustomInput";
import GenderSelector from "../components/form/GenderSelector";

export interface AnimalFormState {
  name: string;
  breed: string;
  gender: "male" | "female";
  description: string;
  color: string[];
  photos: string[]; // Array to hold photo URLs or file paths
}

const CreateScreen = () => {
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <Formik
        initialValues={
          {
            name: "",
            breed: "",
            gender: "male",
            description: "",
            color: [],
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
            <View style={{ padding: 20 }}>
              <CustomInput
                label="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                placeholder="Animal Name"
                onBlur={handleBlur("name")}
                error={touched.name && errors.name}
              />

              <CustomInput
                label="Breed"
                value={values.breed}
                onChangeText={handleChange("breed")}
                placeholder="Breed"
                onBlur={handleBlur("breed")}
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
                onBlur={handleBlur("description")}
                multiline
                error={touched.description && errors.description}
              />

              <View style={{ marginVertical: 10 }}>
                <Text>Color</Text>
                <View style={{ flexDirection: "row" }}>
                  {["red", "blue", "green", "yellow"].map((color) => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => setFieldValue("color", color)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: color,
                        margin: 5,
                        borderWidth: values.color.includes(color) ? 2 : 0,
                        borderColor: "black",
                      }}
                    />
                  ))}
                </View>
                {touched.color && errors.color && (
                  <ErrorMsg error={errors.color as string} />
                )}
              </View>

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
