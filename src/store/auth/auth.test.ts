import { AuthorizationStatus } from '../../const';
import { userData } from '../../types';
import authSliceReducer, { deleteAuthData, saveAuthData } from './auth';

describe('Auth slice', () => {
  it('should save auth data with saveAuthData action', () => {
    const mockUserData: userData = {
      name: 'John Doe',
      avatarUrl: 'path/to/avatar.jpg',
      isPro: true,
      email: 'john@example.com',
      token: 'wefwefwef'
    };

    const result = authSliceReducer(undefined, saveAuthData(mockUserData));

    expect(result.name).toEqual(mockUserData.name);
    expect(result.avatarUrl).toEqual(mockUserData.avatarUrl);
    expect(result.isPro).toEqual(mockUserData.isPro);
    expect(result.email).toEqual(mockUserData.email);
  });

  it('should clear auth data with deleteAuthData action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      name: 'John Doe',
      avatarUrl: 'path/to/avatar.jpg',
      isPro: true,
      email: 'john@example.com'
    };

    const result = authSliceReducer(initialState, deleteAuthData());

    expect(result.name).toEqual('');
    expect(result.avatarUrl).toEqual('');
    expect(result.isPro).toEqual(false);
    expect(result.email).toEqual('');
    expect(result.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
  });
});
