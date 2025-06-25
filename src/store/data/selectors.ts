import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getOffers = (state: State) => state[NameSpace.Data].offers;
const getOffersStatus = (state: State) => state[NameSpace.Data].status;

export {getOffers, getOffersStatus};
