import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types';
import { RequestStatus } from '../../const';
import { fetchOffersAction } from '../api-action';


type DataState = {
  offers: Offer[];
  status: RequestStatus;
}

const initialState: DataState = {
  offers: [],
  status: RequestStatus.Pending
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setOffers(state, action: {payload: Offer[]}) {
      state.offers = action.payload;
    },
    setOffersStatus(state, action: {payload: RequestStatus}) {
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchOffersAction.fulfilled, (state) => {
      state.status = RequestStatus.Loaded;
    }).addCase(fetchOffersAction.rejected, (state) => {
      state.status = RequestStatus.Failed;
    }).addCase(fetchOffersAction.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
  },
});

export const {setOffers, setOffersStatus} = dataSlice.actions;
export default dataSlice.reducer;
