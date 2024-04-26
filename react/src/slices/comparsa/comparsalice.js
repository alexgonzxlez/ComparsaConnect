import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileData: null,
  form: { genders: [], banderas: []},
};

export const comparsaSlice = createSlice({
  name: 'comparsa',
  initialState,
  reducers: {
    setform: (state, action) => {
      state.form = action.payload;
    }
  }
});

export const { setform } = comparsaSlice.actions;
export const comparsaReducer = comparsaSlice.reducer;
