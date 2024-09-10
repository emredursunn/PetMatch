import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { uploadImageToStorage } from "../services/firebaseService/dbService";
import { Ad } from "../types/Ad";


interface AdState {
  ads: Ad[];
  loading: boolean;
  error: string | null;
}

// Initial state for ads
const initialState: AdState = {
  ads: [],
  loading: false,
  error: null,
};

// Async thunk to fetch ads by their IDs
export const fetchAdsByIds = createAsyncThunk(
  "ads/fetchByIds",
  async (adIds: string[]) => {
    const ads: Ad[] = [];
    for (const id of adIds) {
      const adDoc = await getDoc(doc(db, "ads", id));
      if (adDoc.exists()) {
        ads.push(adDoc.data() as Ad);
      }
    }
    return ads;
  }
);

export const deleteAdById = createAsyncThunk(
  "ads/deleteById",
  async ({ adId, userId }: { adId: string; userId: string }) => {
    await deleteDoc(doc(db, "ads", adId));
    await updateDoc(doc(db, "users", userId), {
      adIds: arrayRemove(adId),
    });
    return adId;
  }
);

export const createAd = createAsyncThunk(
  "ads/createAd",
  async (ad: Ad, { rejectWithValue }) => {
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
      return rejectWithValue(error.message);
    }
  }
);

export const updateAd = createAsyncThunk(
  "ads/updateAd",
  async (ad: Ad, { rejectWithValue }) => {
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
      await setDoc(adDocRef, adWithImageUrls, { merge: true });

      return adWithImageUrls;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    // You can add more reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdsByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdsByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(fetchAdsByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch ads";
      })
      .addCase(deleteAdById.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = state.ads.filter((ad) => ad.id !== action.payload);
      })
      .addCase(deleteAdById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete ad";
      })
      .addCase(createAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.loading = false;
        state.ads.push(action.payload);
      })
      .addCase(createAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAd.fulfilled, (state, action) => {
        const index = state.ads.findIndex((ad) => ad.id === action.payload.id);
        if (index !== -1) {
          state.ads[index] = action.payload;
        }
        state.loading = false
      })
      .addCase(updateAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adSlice.reducer;
