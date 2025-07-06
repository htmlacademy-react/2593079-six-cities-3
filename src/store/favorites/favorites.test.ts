import { RequestStatus } from '../../const';
import { getMockOffer } from '../../mock';
import favoritesReducer, { addFavorite, resetFavorites, setFavorites } from './favorites';


describe('Favorites slice', () => {
  it('should set offers with setFavorites action', () => {
    const expectedOffers = Array.from({length: 4}, getMockOffer);

    const result = favoritesReducer(undefined, setFavorites(expectedOffers));

    expect(result.favorites).toEqual(expectedOffers);

  });

  it('should add offers with setFavorites action', () => {
    const expectedOffer = getMockOffer();

    const result = favoritesReducer(undefined, addFavorite(expectedOffer));
    expect(result.favorites.at(-1)).toEqual(expectedOffer);
  });

  it('should reset offers with resetFavorites action', () => {
    const expectedState = { favorites: [],status: RequestStatus.Idle};

    const result = favoritesReducer(undefined, resetFavorites());
    expect(result).toEqual(expectedState);
  });
});
