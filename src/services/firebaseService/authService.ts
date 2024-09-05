import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { showToast } from "../../utils/helperFunctions";
import { IUser } from "../../types/IUser";

export const signUpAsync = async ({
  fullName,
  email,
  password,
  phone
}: {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      fullName,
      email: userCredential.user.email,
      adIds: [],
      userPic: "",
      phone
    } as IUser);

    return userCredential.user;
  } catch (error: any) {
    showToast("error", "Kayıt başarısız", error.message);
    throw new Error(error.message);
  }
};

export const signInAsync = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOutAsync = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
