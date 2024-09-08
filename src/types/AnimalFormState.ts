import { TextStyle } from "react-native";
export interface AnimalFormState {
  step: number;
  animalType: string;
  title: string;
  age:string;
  breed: string;
  gender: string;
  description: string;
  colors: Color[];
  images: string[];
}

export type Color = {
  name: string;
  code: TextStyle["color"];
};
