import { RequestStatus } from '../../const';
import { getMockOfferData } from '../../mock';
import { clearOfferData, setOfferData } from './offer';
import offerReducer from './offer';

describe('Offer slice', () => {
  it('should set offer data with setOfferData action', () => {
    const expectedOfferData = getMockOfferData();

    const result = offerReducer(undefined, setOfferData(expectedOfferData));

    expect(result.offerData).toEqual(expectedOfferData);
  });

  it('should reset offer data with clearOfferData action', () => {
    const expectedOfferState = {
      status: RequestStatus.Idle,
      commentData: [],
      nearbyData: [],
      offerData: null,
    };

    const result = offerReducer(undefined, clearOfferData());

    expect(result).toEqual(expectedOfferState);
  });

});
