
import { Link } from 'react-router-dom';
import { RoutePath } from '../../const';

export default function NotFoundPage() {
  return (
    <Link to={RoutePath.Main} className="error-link" style={{margin: '100px auto', display: 'block', fontSize: '40px'}}>404</Link>
  );
}
