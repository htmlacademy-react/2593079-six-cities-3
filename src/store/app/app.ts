import { createSlice } from '@reduxjs/toolkit';


type AppState = {
  activeCity: string;
}

export const initialState: AppState = {
  activeCity: 'Paris',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCity(state, action: {payload: string}) {
      state.activeCity = action.payload;
    }
  }
});

export const {changeCity} = appSlice.actions;
export default appSlice.reducer;
