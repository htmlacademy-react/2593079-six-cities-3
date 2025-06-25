import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { Offer, OfferData, Review } from '../../types';
import { fetchOffer } from '../api-action';

type PageOfferData = {
  offerData: OfferData | null;
  status: RequestStatus;
  nearbyData: Offer[];
  commentData: Review[];
}

const initialState: PageOfferData = {
  offerData: null,
  status: RequestStatus.Idle,
  nearbyData: [],
  commentData: []
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOfferData(state, action: {payload: OfferData | null}) {
      state.offerData = action.payload;
    },
    setNearbyData(state, action: {payload: Offer[]}) {
      state.nearbyData = action.payload;
    },
    setCommentData(state, action: {payload: Review[]}) {
      state.commentData = action.payload;
    },
    setStatus(state, action: {payload: RequestStatus}) {
      state.status = action.payload;
    },
    addComment(state, action: {payload: Review}) {
      state.commentData.push(action.payload);
    },
    clearOfferData(state) {
      state.status = RequestStatus.Idle;
      state.commentData = [];
      state.nearbyData = [];
      state.offerData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffer.pending, (state) => {
      state.status = RequestStatus.Pending;
    }).addCase(fetchOffer.fulfilled, (state) => {
      state.status = RequestStatus.Loaded;
    }).addCase(fetchOffer.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }

});

export const {setOfferData, setNearbyData, setCommentData, setStatus, clearOfferData, addComment} = offerSlice.actions;
export default offerSlice.reducer;
