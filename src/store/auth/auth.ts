import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { checkLogin } from '../api-action';
import { userData } from '../../types';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
}

export const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  name: '',
  avatarUrl: '',
  isPro: false,
  email: '',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus(state, action: {payload: AuthorizationStatus}) {
      state.authorizationStatus = action.payload;
    },
    saveAuthData(state, action: PayloadAction<userData>) {
      const {name, avatarUrl, isPro, email} = action.payload;
      state.name = name;
      state.avatarUrl = avatarUrl;
      state.isPro = isPro;
      state.email = email;
    },
    deleteAuthData(state) {
      [state.name, state.isPro, state.avatarUrl, state.email, state.authorizationStatus] =
      ['', false, '', '', AuthorizationStatus.NoAuth];

    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    }).addCase(checkLogin.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  }
});

export const {setAuthStatus, saveAuthData, deleteAuthData} = AuthSlice.actions;
export default AuthSlice.reducer;
