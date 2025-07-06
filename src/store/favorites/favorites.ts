import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { Offer } from '../../types';
import { fetchFavorites } from '../api-action';


type FavoritesState = {
  favorites: Offer[];
  status: RequestStatus;
};

export const initialState: FavoritesState = {
  favorites: [],
  status: RequestStatus.Idle
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Offer[]>) {
      state.favorites = action.payload;
    },
    deleteFavorite(state, action: PayloadAction<Offer>) {
      const index = state.favorites.findIndex((favorite) => favorite.id === action.payload.id);
      state.favorites.splice(index, 1);
    },
    addFavorite(state, action: PayloadAction<Offer>) {
      state.favorites.push(action.payload);
    },
    resetFavorites(state) {
      state.favorites = [];
      state.status = RequestStatus.Idle;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state) => {
      state.status = RequestStatus.Loaded;
    }).addCase(fetchFavorites.rejected, (state) => {
      state.status = RequestStatus.Failed;
    }).addCase(fetchFavorites.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
  }
});


export const {setFavorites, deleteFavorite,addFavorite, resetFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
