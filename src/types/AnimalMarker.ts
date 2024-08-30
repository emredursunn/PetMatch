import { AnimalAd } from "./AnimalAd";

export type AnimalMarker = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  data: AnimalAd;
};
