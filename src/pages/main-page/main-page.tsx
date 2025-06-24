import MainEmpty from '../../components/main-empty/main-empty';
import MainPageScreen from '../../components/main-page-screen/main-page-screen';
import { RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getOffers, getOffersStatus } from '../../store/data/selectors';


export default function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const offersStatus = useAppSelector(getOffersStatus);
  return (!offers.length && offersStatus === RequestStatus.Failed ?
    <MainEmpty/> : <MainPageScreen offers={offers}/>
  );
}
