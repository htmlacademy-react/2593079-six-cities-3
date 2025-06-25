import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { checkLogin, loginAction } from '../api-action';
import { userData } from '../../types';


type AuthState = {
  authorizationStatus: AuthorizationStatus;
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
}

const initialState: AuthState = {
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    }).addCase(checkLogin.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    }).addCase(loginAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    }).addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  }
});

export const {setAuthStatus, saveAuthData} = AuthSlice.actions;
export default AuthSlice.reducer;
