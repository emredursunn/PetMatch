import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signInAsync,
  signOutAsync,
  signUpAsync,
} from "../services/firebaseService/authService";
import { removeFromStorage, saveToStorage } from "../utils/helperFunctions";
import { getUser } from "../services/firebaseService/dbService";
import { IUser } from "../types/IUser";

interface AuthState {
  user: IUser | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      fullName,
      email,
      password,
      phone
    }: { fullName: string; email: string; password: string, phone:string },
    { rejectWithValue,dispatch }
  ) => {
    try {
      await signUpAsync({ fullName, email, password, phone });
      await dispatch(signIn({ email, password }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const uid = (await signInAsync({ email, password })).uid;
      await saveToStorage("uid", uid);
      const user = await getUser(uid)
      console.log("user",user)
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOutAsync();
      await removeFromStorage("uid");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log(action.payload)
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
