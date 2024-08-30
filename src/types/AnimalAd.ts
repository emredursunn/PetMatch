import { ViewStyle } from "react-native";
import { Color } from "./AnimalFormState";

export type AnimalAd = {
  id:string,
  userId:string,
  animalType: AnimalType;
  title: string;
  age: string;
  gender: string;
  breed: string;
  description: string;
  colors: Color[];
  images: string[];
};

export enum AnimalTypes {
  DOG = "dog",
  CAT = "cat",
  OTHERS = "others",
}

export type AnimalType = {
  name: AnimalTypes;
  backgroundColor: ViewStyle["backgroundColor"];
  lottie: string;
};

export type Breed = {
  id:string,
  name:string
}
