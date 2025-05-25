import MainEmpty from '../../components/main-empty/main-empty';
import { Offer } from '../../mocks/offers';
import MainPageScreen from '../../components/main-page-screen/main-page-screen';

type MainPageProps = {
  offers: Offer[];
}

export default function MainPage({offers}: MainPageProps): JSX.Element {
  return (offers.length ?
    <MainPageScreen offers={offers}/> : <MainEmpty/>
  );
}
