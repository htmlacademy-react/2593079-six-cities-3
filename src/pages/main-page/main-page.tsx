import MainEmpty from '../../components/main-empty/main-empty';
import MainPageScreen from '../../components/main-page-screen/main-page-screen';
import { useAppSelector } from '../../hooks/store';


export default function MainPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  return (offers?.length ?
    <MainPageScreen offers={offers}/> : <MainEmpty/>
  );
}
