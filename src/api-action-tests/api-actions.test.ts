import createAPI from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes, getMockReview } from '../mocks/util';
import { RouteAPI } from '../const';
import { addFavoriteRequest, checkLogin, deleteFavoriteRequest, fetchComments, fetchFavorites, fetchNearbyOffers, fetchOffer, fetchOffersAction, loginAction, postComment } from '../store/api-action';
import { initialState, saveAuthData } from '../store/auth/auth';
import { getMockOffer, getMockOfferData } from '../mock';
import { setOffers } from '../store/data/data';
import { redirectTo } from '../store/action';
import * as tokenStorage from '../services/token';
import { addComment, initialOfferState, setCommentData, setNearbyData, setOfferData } from '../store/offer/offer';
import { addFavorite, deleteFavorite, setFavorites } from '../store/favorites/favorites';


describe('Api-actions', () => {

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];

  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      app: { activeCity: 'Paris' },
      auth: initialState,
      offer: initialOfferState
    });
  });

  const mockOfferId = '1';


  describe('check Auth api-actions', () => {

    it('should dispatch checkLoginAction.pending and checkLoginAction.fulfilled with checkLoginAction when response 200', async () => {
      mockAxiosAdapter.onGet(RouteAPI.LOGIN).reply(200, {
        'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false,
        'email': 'Oliver.conner@gmail.com',
        'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      });

      await store.dispatch(checkLogin());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkLogin.pending.type,
        saveAuthData.type,
        checkLogin.fulfilled.type
      ]);

    });

    it('should dispatch checkLoginAction.pending and checkLoginAction.fulfilled with checkLoginAction when response 200', async () => {
      mockAxiosAdapter.onGet(RouteAPI.LOGIN).reply(400, {
        'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false,
        'email': 'Oliver.conner@gmail.com',
        'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      });

      await store.dispatch(checkLogin());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkLogin.pending.type,
        checkLogin.rejected.type
      ]);

    });

    it('should dispatch loginAction.pending and loginAction.fulfilled when response 200', async () => {
      mockAxiosAdapter.onPost(RouteAPI.LOGIN).reply(200, {
        'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false,
        'email': 'Oliver.conner@gmail.com',
        'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      });

      await store.dispatch(loginAction({
        'email': 'Oliver.conner@gmail.com',
        'password': 'password1'
      }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        saveAuthData.type,
        redirectTo.type,
        loginAction.fulfilled.type
      ]);
    });

    it('should save token when response 200', async () => {
      const fakeServerResponse = {token: 'token'};
      mockAxiosAdapter.onPost(RouteAPI.LOGIN).reply(200, fakeServerResponse);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction({
        'email': 'Oliver.conner@gmail.com',
        'password': 'password1'
      }));

      expect(mockSaveToken).toBeCalledTimes(1);
    });


  });

  describe('Fetch offers', () => {
    it('should dispatch fetchOfferActions.pending and fetchOfferActions.fulfilled with fetchOfferActions when response 200', async () => {
      const mockOffers = [getMockOffer(), getMockOffer()];
      mockAxiosAdapter.onGet(RouteAPI.GET_OFFERS).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        setOffers.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);

    });

    it('should dispatch fetchOfferActions.pending and fetchOfferActions.fulfilled with fetchOfferActions when response 400', async () => {
      const mockOffers = [getMockOffer(), getMockOffer()];
      mockAxiosAdapter.onGet(RouteAPI.GET_OFFERS).reply(400, mockOffers);

      await store.dispatch(fetchOffersAction());
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);

    });
  });

  describe('Fetch offer', () => {
    it('should dispatch fetchOffer.pending and fetchOffer.fulfilled with fetchOfferActions when response 200', async () => {
      const mockOffer = getMockOfferData;
      mockAxiosAdapter.onGet(`${RouteAPI.GET_OFFER}/test`).reply(200, mockOffer);

      await store.dispatch(fetchOffer('test'));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffer.fulfilled>;

      expect(actions).toEqual([
        fetchOffer.pending.type,
        setOfferData.type,
        fetchOffer.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch fetchOffer.pending and fetchOffer.rejected with fetchOfferActions when response 400', async () => {
      const mockOffer = getMockOfferData;
      mockAxiosAdapter.onGet(`${RouteAPI.GET_OFFER}/test`).reply(400, mockOffer);

      await store.dispatch(fetchOffer('test'));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);

      expect(actions).toEqual([
        fetchOffer.pending.type,
        fetchOffer.rejected.type,
      ]);

    });


    it('should dispatch fetchComments.pending and fetchComments.fulfilled when response 200', async () => {
      const mockReviews = [getMockReview()];
      mockAxiosAdapter.onGet(`${RouteAPI.GET_COMMENTS}/${mockOfferId}`).reply(200, mockReviews);

      await store.dispatch(fetchComments(mockOfferId));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fulfilledAction = emittedActions.at(1) as ReturnType<typeof fetchComments.fulfilled>;

      expect(actions).toEqual([
        fetchComments.pending.type,
        setCommentData.type,
        fetchComments.fulfilled.type,
      ]);

      expect(fulfilledAction.payload).toEqual(mockReviews);
    });

    it('should dispatch fetchComments.pending and fetchComments.rejected when response 400', async () => {
      mockAxiosAdapter.onGet(`${RouteAPI.GET_COMMENTS}/${mockOfferId}`).reply(400);

      await store.dispatch(fetchComments(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchComments.pending.type,
        fetchComments.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should dispatch fetchNearbyOffers.pending and fetchNearbyOffers.fulfilled when response 200', async () => {
      const mockOffers = [getMockOffer(), getMockOffer()];
      mockAxiosAdapter.onGet(`${RouteAPI.GET_OFFER}/${mockOfferId}/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchNearbyOffers(mockOfferId));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fulfilledAction = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffers.fulfilled>;

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        setNearbyData.type,
        fetchNearbyOffers.fulfilled.type,
      ]);

      expect(fulfilledAction.payload).toEqual(mockOffers);
    });

    it('should dispatch fetchNearbyOffers.pending and fetchNearbyOffers.rejected when response 400', async () => {
      mockAxiosAdapter.onGet(`${RouteAPI.GET_OFFER}/${mockOfferId}/nearby`).reply(400);

      await store.dispatch(fetchNearbyOffers(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        fetchNearbyOffers.rejected.type,
      ]);

    });


  });

  describe('postComment', () => {
    it('should dispatch postComment.pending and postComment.fulfilled when response 200', async () => {
      const mockReviewData = {
        'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        'rating': 4
      };
      mockAxiosAdapter.onPost(`${RouteAPI.GET_COMMENTS}/${mockOfferId}`)
        .reply(200);

      await store.dispatch(postComment({ id: mockOfferId, body: mockReviewData }));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);

      expect(actions).toEqual([
        postComment.pending.type,
        addComment.type,
        postComment.fulfilled.type,
      ]);

    });

    it('should dispatch postComment.pending and postComment.rejected when response 400', async () => {
      const mockReviewData = {
        'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        'rating': 4
      };
      mockAxiosAdapter.onPost(`${RouteAPI.GET_COMMENTS}/${mockOfferId}`)
        .reply(400);

      await store.dispatch(postComment({ id: mockOfferId, body: mockReviewData }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postComment.pending.type,
        postComment.rejected.type,
      ]);
    });
  });


  describe('Favorite actions', () => {
    it('should dispatch addFavoriteRequest.pending and addFavoriteRequest.fulfilled when response 200', async () => {
      const mockOffer = getMockOffer();
      mockAxiosAdapter.onPost(`${RouteAPI.GET_FAVORITES}/${mockOffer.id}/1`).reply(200, mockOffer);

      await store.dispatch(addFavoriteRequest(mockOffer));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);

      expect(actions).toEqual([
        addFavoriteRequest.pending.type,
        addFavorite.type,
        addFavoriteRequest.fulfilled.type,
      ]);
    });

    it('should dispatch addFavoriteRequest.pending and addFavoriteRequest.rejected when response 400', async () => {
      const mockOffer = getMockOffer();
      mockAxiosAdapter.onPost(`${RouteAPI.GET_FAVORITES}/${mockOffer.id}/1`).reply(400);

      await store.dispatch(addFavoriteRequest(mockOffer));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addFavoriteRequest.pending.type,
        addFavoriteRequest.rejected.type,
      ]);
    });

    it('should dispatch deleteFavoriteRequest.pending and deleteFavoriteRequest.fulfilled when response 200', async () => {
      const mockOffer = getMockOffer();
      mockAxiosAdapter.onPost(`${RouteAPI.GET_FAVORITES}/${mockOffer.id}/0`).reply(200, mockOffer);

      await store.dispatch(deleteFavoriteRequest(mockOffer));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);

      expect(actions).toEqual([
        deleteFavoriteRequest.pending.type,
        deleteFavorite.type,
        deleteFavoriteRequest.fulfilled.type,
      ]);
    });

    it('should dispatch deleteFavoriteRequest.pending and deleteFavoriteRequest.rejected when response 400', async () => {
      const mockOffer = getMockOffer();
      mockAxiosAdapter.onPost(`${RouteAPI.GET_FAVORITES}/${mockOffer.id}/0`).reply(400);

      await store.dispatch(deleteFavoriteRequest(mockOffer));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        deleteFavoriteRequest.pending.type,
        deleteFavoriteRequest.rejected.type,
      ]);
    });

    it('should dispatch fetchFavorites.pending and fetchFavorites.fulfilled when response 200', async () => {
      const mockFavorites = [getMockOffer(), getMockOffer()];
      mockAxiosAdapter.onGet(RouteAPI.GET_FAVORITES).reply(200, mockFavorites);

      await store.dispatch(fetchFavorites());
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fulfilledAction = emittedActions.at(1) as ReturnType<typeof fetchFavorites.fulfilled>;

      expect(actions).toEqual([
        fetchFavorites.pending.type,
        setFavorites.type,
        fetchFavorites.fulfilled.type,
      ]);

      expect(fulfilledAction.payload).toEqual(mockFavorites);
    });

    it('should dispatch fetchFavorites.pending and fetchFavorites.rejected when response 400', async () => {
      mockAxiosAdapter.onGet(RouteAPI.GET_FAVORITES).reply(400);

      await store.dispatch(fetchFavorites());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.rejected.type,
      ]);
    });
  });

});
