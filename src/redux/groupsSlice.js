// src/redux/groupsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../services/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Group } from "../models/Group";
import { uploadImageToStorage } from "../services/storageService";

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (groupData, thunkAPI) => {
    try {
      if (groupData.imageUrl) {
        const imageUrl = await uploadImageToStorage(groupData.imageUrl);
        groupData.imageUrl = imageUrl;
      }

      const groupRef = await addDoc(collection(db, "groups"), groupData);

      // Aquí puedes manejar cualquier lógica adicional después de guardar en Firestore
      return {
        id: groupRef.id,
        ...groupData,
      };
    } catch (error) {
      console.error("Error adding group:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loadGroups = createAsyncThunk(
  "groups/loadGroups",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "groups"));

      const groups = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const group = new Group(
          doc.id,
          data.name,
          data.description,
          data.members,
          data.imageUrl,
        );
        groups.push(group.toObject());
      });

      return groups;
    } catch (error) {
      console.error("Error fetching groups:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    clearGroups: (state) => {
      state.groups = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create group
      .addCase(createGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups.push(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Load groups
      .addCase(loadGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(loadGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setGroups, clearGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
