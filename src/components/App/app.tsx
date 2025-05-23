import { Offer } from '../../mocks/offers';
import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  offersCount: number;
  offers: Offer[];
}


export default function App({offersCount, offers}: AppProps): JSX.Element {
  return (
    <MainPage offersCount={offersCount} offers={offers}/>
  );
}
