import MainEmpty from '../../components/main-empty/main-empty';
import MainPageScreen from '../../components/main-page-screen/main-page-screen';
import { useAppSelector } from '../../hooks/store';


export default function MainPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const isOffersLoaded = useAppSelector((state) => state.isOffersLoaded);
  return (!offers.length && isOffersLoaded ?
    <MainEmpty/> : <MainPageScreen offers={offers}/>
  );
}
