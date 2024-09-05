import { ViewStyle } from "react-native";

export type Ad = {
  id?:string,
  animalType: AnimalType;
  title: string;
  age: string;
  gender: string;
  breed: string;
  colors: string[];
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
