import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { IUser } from "../../types/IUser";

export const uploadImage = (file: any) => {
  const storageRef = ref(storage, "images");
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded!");
  });
};

export const getUser = async (uid:string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data() as IUser
    return user;
  }
  return null
};
