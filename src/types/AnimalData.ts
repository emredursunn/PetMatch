import { ViewStyle } from "react-native";

export type AnimalData = {
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

export enum AnimalTypes {
  DOG = "dog",
  CAT = "cat",
  BIRD = "bird",
  OTHERS = "others",
}

export type AnimalType = {
  name: AnimalTypes;
  backgroundColor: ViewStyle["backgroundColor"];
  lottie: string;
};

export type Breed = {
  id: string;
  name: string;
};
