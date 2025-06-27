import { NameSpace } from '../../const';
import { State } from '../../types/store';


const getFavorites = (state: State) => state[NameSpace.Favorites].favorites;
const getFavoritesStatus = (state: State) => state[NameSpace.Favorites].status;

export {getFavorites, getFavoritesStatus};
