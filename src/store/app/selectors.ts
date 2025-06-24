import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getActiveCity = (state: State) => state[NameSpace.App].activeCity;

export {getActiveCity};
