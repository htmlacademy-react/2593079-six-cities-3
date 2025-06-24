import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getAuthStatus = (state: State) => state[NameSpace.Auth].authorizationStatus;

export {getAuthStatus};
