/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store.ts';

export interface UserState {
  id: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  admin: boolean | null;
}

interface Payload {
  id: string;
  email: string;
  city: string;
  state: string;
  admin: boolean;
}

const initialState = {
  id: null,
  email: null,
  city: null,
  state: null,
} as UserState;

/**
 * A slice of the redux store that contains the user's information. This slice defines reducer for logging in a user, logging out a user, and promoting a user to admin.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Payload>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.admin = action.payload.admin;
    },
    toggleAdmin: (state) => {
      state.admin = !state.admin;
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.city = null;
      state.state = null;
      state.admin = null;
    },
  },
});

export const { login, logout, toggleAdmin } = userSlice.actions;
export default userSlice.reducer;

/**
 * A selector that returns the user state
 * @param state The redux store state
 * @returns The user state
 */
export const selectUser = (state: RootState) => state.user;
