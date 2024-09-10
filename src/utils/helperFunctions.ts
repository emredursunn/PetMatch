import {  Linking, Platform } from "react-native";
import { LatLng } from "react-native-maps";
import Toast, { ToastType } from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ad, AnimalFormState, Cluster } from "../types/Ad";

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

export const findUserById = async (userId:string) => {
  return 
}

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
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export const validateStepManually = (step: number, values: AnimalFormState) => {
  switch (step) {
    case 1:
      return !!values.animalType;
    case 2:
      return !!values.breed;
    case 3:
      return !!values.gender;
    case 4:
      return !!values.title.trim() && !!values.age && values.colors.length > 0;
    case 5:
      return values.images.length > 0 && values.description.trim().length > 0 
    case 6:
      return !!values.location.city.trim() && !!values.location.district.trim() && !!values.location.street.trim() 
    default:
      return false;
  }
};

export const showToast = (
  type: ToastType,
  text1: string | undefined,
  text2: string | undefined,
  visibilityTime?:number
) => {
  Toast.show({
    type,
    text1,
    text2,
    swipeable: true,
    text1Style: { fontSize: 18 },
    text2Style: { fontSize: 12 },
    visibilityTime
  });
};

export const saveToStorage = async (key:string,data: any) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.error(error);
  }
};

export const getFromStorage = async (key:string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    return null;
  }
};

export const removeFromStorage = async (key:string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing token', error);
  }
};

export const getCoordinates = async (address:string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('Geocoding API Error: ' + response.data.status);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

export const groupAdsByDistance = (ads : Ad[], maxDistance:number) => {
  const clusters : Cluster[] = [];
  const usedAds = new Set<Ad>();

  ads.forEach((ad, index) => {
    if (usedAds.has(ad)) return;

    const cluster = {
      latitude: ad.location.coordinates.latitude,
      longitude: ad.location.coordinates.longitude,
      ads: [ad],
    };

    ads.forEach((otherAd, otherIndex) => {
      if (index !== otherIndex && !usedAds.has(otherAd)) {
        const dist = distance(ad.location.coordinates, otherAd.location.coordinates);
        if (dist <= maxDistance) {
          cluster.ads.push(otherAd);
          usedAds.add(otherAd);
        }
      }
    });

    clusters.push(cluster);
  });

  return clusters;
};
