import { TextStyle, ViewStyle } from "react-native";

export type Ad = {
  id: string;
  userId: string;
  animalType: string;
  title: string;
  age: string;
  gender: string;
  breed: string;
  colors: Color[];
  images: string[];
  contact: string;
  description?: string;
  location: ILocation;
};

export type AnimalType = {
  name: string;
  backgroundColor: ViewStyle["backgroundColor"];
  lottie: string;
};

export type Breed = {
  id: string;
  name: string;
};

export type Color = {
  name: string;
  code: TextStyle["color"];
};

export type ILocation = {
  city: string;
  district: string;
  street: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
};

export interface AnimalFormState {
  step: number;
  animalType: string;
  title: string;
  age: string;
  breed: string;
  gender: string;
  description: string;
  colors: Color[];
  images: string[];
  location: Omit<ILocation, "coordinates">;
}

export type Cluster = {
  latitude:number,
  longitude:number,
  ads:Ad[]
}