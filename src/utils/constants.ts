import { Region } from "react-native-maps";

export const defaultRegion: Region = {
  latitude: 41.043869,
  longitude: 29.012890,
  latitudeDelta: 0.5,   // Increased from 0.0822 to 0.5
  longitudeDelta: 0.25, // Increased from 0.0421 to 0.25
};

export const catColors = [
  { name: "white", code: "white" },
  { name: "black", code: "black" },
  { name: "gray", code: "gray" },
  { name: "lightgray", code: "lightgray" },
  { name: "brown", code: "brown" },
  { name: "orange", code: "orange" },
  { name: "yellow", code: "yellow" },
  { name: "darkcyan", code: "darkcyan" },
];

export const colors = {
  purple: "rgba(78, 44, 191,1)",
  purple_800: "rgba(78, 44, 191, 0.85)",
  purple_700: "rgba(78, 44, 191, 0.72)",
  purple_500: "rgba(78, 44, 191, 0.5)",
  bottom_background: "rgba(197, 197, 197, 0.2)",
  fuchsia_800: "rgba(226, 220, 223, 0.8)",
  transparent: "transparent",
  white: "white",
  black: "black",
  red:"red",
  blue:"#0e38f5",
  pink:"#f50ea8"
};

export const animalTypes = {
  cat: {
    name: "Cat",
    backgroundColor: "yellow",
    lottie:
      "https://lottie.host/93101278-06c3-4cd1-a7cf-8e3a8d8f317c/AzKTtZZolK.json",
  },
  dog: {
    name: "Dog",
    backgroundColor: "yellow",
    lottie:
      "https://lottie.host/f68099d9-09b9-4367-909e-45b665251783/ROs9qvbnOf.json",
  },
  bird: {
    name: "Bird",
    backgroundColor: "yellow",
    lottie:
      "https://lottie.host/1d5b4b88-39ef-43ce-9b13-a5b43b036f1a/iP15hfxdqT.json",
  },

  other: {
    name: "Other",
    backgroundColor: "yellow",
    lottie:
      "https://lottie.host/60c74f6e-d0fb-4053-99e5-0d6bf860a390/mgasF929Ce.json",
  },
};
