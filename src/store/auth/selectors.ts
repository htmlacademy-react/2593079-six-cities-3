import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getAuthStatus = (state: State) => state[NameSpace.Auth].authorizationStatus;
const getUserName = (state: State) => state[NameSpace.Auth].name;
const getUserIsPro = (state: State) => state[NameSpace.Auth].isPro;
const getUserEmail = (state: State) => state[NameSpace.Auth].email;
const getUserAvatar = (state: State) => state[NameSpace.Auth].avatarUrl;

export {getAuthStatus, getUserAvatar, getUserEmail, getUserIsPro, getUserName};
