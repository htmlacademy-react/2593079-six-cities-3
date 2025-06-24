import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { checkLogin, loginAction } from '../api-action';


type AuthState = {
  authorizationStatus: AuthorizationStatus;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus(state, action: {payload: AuthorizationStatus}) {
      state.authorizationStatus = action.payload;
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

export const {setAuthStatus} = AuthSlice.actions;
export default AuthSlice.reducer;
