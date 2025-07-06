import { createMemoryHistory, MemoryHistory } from 'history';
import App from './app';
import { withHistory, withStore } from '../../mocks/mock-component';
import { Cities, NameSpace, RequestStatus, RoutePath } from '../../const';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../mocks/util';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPageScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.Data]: {
        status: RequestStatus.Loaded,
        offers: []
      }
    }));
    mockHistory.push(RoutePath.Main);

    render(withStoreComponent);

    expect(screen.getByTestId('cities-list')).toBeInTheDocument();

    Cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should render "MainEmpty" when user navigate to "/" and server returned error', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.Data]: {
        status: RequestStatus.Failed,
        offers: []
      }
    }));
    mockHistory.push(RoutePath.Main);

    render(withStoreComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();

    Cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });
});
