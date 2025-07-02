
import { Link } from 'react-router-dom';
import { RoutePath } from '../../const';

export default function NotFoundPage() {
  return (
    <Link to={RoutePath.Main} className="error-link" style={{margin: '100px auto', display: 'block'}}>404</Link>
  );
}
