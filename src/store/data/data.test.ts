import { RequestStatus } from '../../const';
import { getMockOffer } from '../../mock.ts';
import dataSliceReducer, { setOffers, setOffersStatus } from './data.ts';


describe('Data slice', () => {
  it('should return initial store with empty action', () => {
    const emptyAction = {type: '', payload: {}};
    const initialState = {offers: [], status: RequestStatus.Idle};

    const result = dataSliceReducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with undefined state and empty action', () => {
    const emptyAction = {type: '', payload: {}};
    const expectedState = {offers: [], status: RequestStatus.Pending};

    const result = dataSliceReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set offers with setOffers action', () => {
    const expectedOffers = Array.from({length: 5}, getMockOffer);

    const result = dataSliceReducer(undefined, setOffers(expectedOffers));

    expect(result.offers).toEqual(expectedOffers);
  });
  it('should set offers status with setOffersStatus action', () => {
    const expectedStatus = RequestStatus.Failed;

    const result = dataSliceReducer(undefined, setOffersStatus(expectedStatus));

    expect(result.status).toEqual(expectedStatus);
  });
});
