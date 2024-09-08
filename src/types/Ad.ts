import { ViewStyle } from "react-native";
import { Color } from "./AnimalFormState";

export type Ad = {
  id:string,
  userId:string,
  animalType: string;
  title: string;
  age: string;
  gender: string;
  breed: string;
  colors: Color[];
  images: string[];
  contact: string;
  description?: string;
};

export type AnimalType = {
  name: string;
  backgroundColor: ViewStyle["backgroundColor"];
  lottie: string;
};

export type Breed = {
  id:string,
  name:string
}
