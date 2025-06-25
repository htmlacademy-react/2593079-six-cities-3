import { NameSpace } from '../../const';
import { State } from '../../types/store';


const getOffer = (state: State) => state[NameSpace.Offer].offerData;
const getComments = (state: State) => state[NameSpace.Offer].commentData;
const getNearby = (state: State) => state[NameSpace.Offer].nearbyData;
const getOfferStatus = (state: State) => state[NameSpace.Offer].status;

export {getOffer, getComments, getNearby, getOfferStatus};

