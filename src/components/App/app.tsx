import { Offer } from '../../mocks/offers';
import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  offers: Offer[];
}

export default function App({ offers}: AppProps): JSX.Element {
  return (
    <MainPage offers={offers}/>
  );
}
