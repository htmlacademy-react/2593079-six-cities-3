import MainEmpty from '../../components/main-empty/main-empty';
import { Offer } from '../../mocks/offers';
import MainPageScreen from '../../components/main-page-screen/main-page-screen';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
}

export default function MainPage({offersCount, offers}: MainPageProps): JSX.Element {
  return (offersCount ?
    <MainPageScreen offers={offers} offersCount={offersCount}/> : <MainEmpty/>
  );
}
