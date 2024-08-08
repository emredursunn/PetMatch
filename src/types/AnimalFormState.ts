import { TextStyle } from "react-native";

export interface AnimalFormState {
  title: string;
  breed: string;
  gender: "male" | "female";
  description: string;
  colors: Color[];
  photos: string[]; 
}

export type Color = {
    name:string,
    code:TextStyle["color"]
}