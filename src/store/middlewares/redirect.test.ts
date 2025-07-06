import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectTo } from '../action';
import { RoutePath } from '../../const';
import { State } from '../../types/store';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectTo(RoutePath.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(RoutePath.Login);
  });

  it('should not redirect to "/login" with empty action', () => {
    const emptyAction = { type: '', payload: RoutePath.Login };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(RoutePath.Login);
  });
});
