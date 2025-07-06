import appSliceReducer, { changeCity } from './app';

describe('App slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      activeCity: 'Paris',
    };

    const result = appSliceReducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with undefined state and empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeCity: 'Paris',
    };

    const result = appSliceReducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change active city with changeCity action', () => {
    const newCity = 'Amsterdam';
    const initialState = {
      activeCity: 'Paris',
    };

    const result = appSliceReducer(initialState, changeCity(newCity));

    expect(result.activeCity).toEqual(newCity);
    expect(result.activeCity).not.toEqual(initialState.activeCity);
  });
});
