import { Alert, Linking, Platform } from "react-native";
import { LatLng } from "react-native-maps";

export const makePhoneCall = (phone: string) => {
  console.log("callNumber ----> ", phone);
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  //   Linking.canOpenURL(phoneNumber)
  //     .then((supported) => {
  //       if (!supported) {
  //         Alert.alert("Phone number is not available");
  //       } else {
  //         return Linking.openURL(phoneNumber);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  Linking.openURL(phoneNumber);
};

export function distance(coords1: LatLng, coords2: LatLng): number {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;
  
  const lat1 = toRadians(coords1.latitude);
  const lon1 = toRadians(coords1.longitude);
  const lat2 = toRadians(coords2.latitude);
  const lon2 = toRadians(coords2.longitude);

  const R = 6371; // Dünya'nın yarıçapı (kilometre cinsinden)
  
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}
