import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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
    const adsNoCoords = querySnapshot.docs.map((doc) => doc.data() as  Omit<Ad, 'location'> & { location: Omit<ILocation, 'coordinates'> });
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



export const uploadImageToStorage = async (uri: string): Promise<{ downloadURL: string; filename: string }> => {
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const storageRef = ref(storage, filename);
  const img = await fetch(uploadUri);
  const bytes = await img.blob();

  const uploadTask = uploadBytesResumable(storageRef, bytes);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(`${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`);
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

export const saveImageUrlToDatabase = async (downloadUrl: string, filename: string) => {
  const firestoreRef = doc(db, 'images', filename);
  setDoc(firestoreRef, {
    imageUrl: downloadUrl,
  })
    .then(() => {
      console.log('Image URL added to Firestore!');
    })
    .catch((e) => {
      console.log('Error adding image URL to Firestore: ', e);
    });
};