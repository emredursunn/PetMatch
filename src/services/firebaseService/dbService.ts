import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IUser } from "../../types/IUser";
import { Platform } from "react-native";
import { Ad, ILocation } from "../../types/Ad";
import { getCoordinates } from "../../utils/helperFunctions";

export const createUser = async (user: IUser) => {
  setDoc(doc(db, "users", user.uid), user);
};

export const getUser = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data() as IUser;
    return user;
  }
  return null;
};

export const getAllAds = async (): Promise<Ad[]> => {
  try {
    const adsCollectionRef = collection(db, "ads");
    const querySnapshot = await getDocs(adsCollectionRef);
    const adsNoCoords = querySnapshot.docs.map(
      (doc) =>
        doc.data() as Omit<Ad, "location"> & {
          location: Omit<ILocation, "coordinates">;
        }
    );
    // Construct the full address for each ad and fetch coordinates in parallel
    const adPromises = adsNoCoords.map(async (ad) => {
      const address = `${ad.location.street}, ${ad.location.district}, ${ad.location.city}`;
      const coordinates = await getCoordinates(address);
      return {
        ...ad,
        location: {
          ...ad.location,
          coordinates,
        },
      } as Ad;
    });

    // Wait for all the promises to resolve
    const adsWithCoordinates = await Promise.all(adPromises);
    return adsWithCoordinates;
  } catch (error) {
    console.error("Error fetching ads: ", error);
    throw error;
  }
};

export const fetchAdsByIds = async (adIds: string[]) => {
  const ads: Ad[] = [];
  for (const id of adIds) {
    const adDoc = await getDoc(doc(db, "ads", id));
    if (adDoc.exists()) {
      ads.push(adDoc.data() as Ad);
    }
  }
  return ads;
};

export const deleteAdById = async ({
  adId,
  userId,
}: {
  adId: string;
  userId: string;
}) => {
  await deleteDoc(doc(db, "ads", adId));
  await updateDoc(doc(db, "users", userId), {
    adIds: arrayRemove(adId),
  });
  return adId;
};

export const createAd = async (ad: Ad) => {
  try {
    // Upload images and get their URLs
    const imageUploadPromises = ad.images.map(async (file) => {
      const { downloadURL } = await uploadImageToStorage(file);
      return downloadURL;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    // Update ad object with image URLs
    const adWithImageUrls = { ...ad, images: imageUrls };

    // Create ad document in Firestore
    const adDocRef = doc(db, "ads", ad.id!);
    await setDoc(adDocRef, adWithImageUrls);

    // Update user document with new ad ID
    const userDocRef = doc(db, "users", ad.userId);
    await updateDoc(userDocRef, {
      adIds: arrayUnion(ad.id),
    });

    return adWithImageUrls;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateAd = async (ad: Ad) => {
  try {
    // Upload new images and get their URLs
    const imageUploadPromises = ad.images.map(async (file) => {
      const { downloadURL } = await uploadImageToStorage(file);
      return downloadURL;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    // Prepare ad data with updated image URLs
    const adWithImageUrls = { ...ad, images: imageUrls };

    // Update ad document in Firestore
    const adDocRef = doc(db, "ads", ad.id);
    await updateDoc(adDocRef, adWithImageUrls);

    return adWithImageUrls;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const uploadImageToStorage = async (
  uri: string
): Promise<{ downloadURL: string; filename: string }> => {
  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
  const storageRef = ref(storage, filename);
  const img = await fetch(uploadUri);
  const bytes = await img.blob();

  const uploadTask = uploadBytesResumable(storageRef, bytes);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(
          `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`
        );
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ downloadURL, filename });
      }
    );
  });
};

export const saveImageUrlToDatabase = async (
  downloadUrl: string,
  filename: string
) => {
  const firestoreRef = doc(db, "images", filename);
  setDoc(firestoreRef, {
    imageUrl: downloadUrl,
  })
    .then(() => {
      console.log("Image URL added to Firestore!");
    })
    .catch((e) => {
      console.log("Error adding image URL to Firestore: ", e);
    });
};
