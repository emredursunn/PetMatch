import { AnimalData } from "./AnimalData";

export type AnimalMarker = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  data: AnimalData;
};
