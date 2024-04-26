import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileData: null,
  form: { genders: [], banderas: []},
};

export const comparsaSlice = createSlice({
  name: 'comparsa',
  initialState,
  reducers: {
    setprofileData: (state, action) => {
      state.profileData = action.payload;
    },
    setform: (state, action) => {
      state.form = action.payload;
    }
  }
});

export const { setprofileData,setform } = comparsaSlice.actions;
export const comparsaReducer = comparsaSlice.reducer;
