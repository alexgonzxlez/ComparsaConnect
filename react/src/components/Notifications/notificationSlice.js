import { createSlice } from "@reduxjs/toolkit";

export const notificationInitialState = {
  open: false,
  type: "info",
  message: "",
  timeout: 5000
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    addNotification: (state, action) => {
      return {
        ...notificationInitialState,
        ...action.payload,
        open: true
      };
    },
    clearNotification: (state) => {
      return {
        ...state,
        open: false
      };
    }
  }
});

export const NotificationActions = NotificationSlice.actions;
export const NotificationReducer = NotificationSlice.reducer;
