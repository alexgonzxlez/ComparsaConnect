import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileData: null,
};

export const comparsaSlice = createSlice({
  name: 'comparsa',
  initialState,
  reducers: {
    setprofileData: (state, action) => {
      state.profileData = action.payload;
    }
  }
});

export const { setprofileData } = comparsaSlice.actions;
export const comparsaReducer = comparsaSlice.reducer;
