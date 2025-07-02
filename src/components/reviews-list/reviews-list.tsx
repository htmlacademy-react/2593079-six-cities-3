import { MAX_COMMENTS_COUNT } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getComments } from '../../store/offer/selectors';
import { compareComments } from '../../utils';
import Review from '../review/review';

export default function ReviewsList(): JSX.Element {
  const reviews = useAppSelector(getComments).slice().sort(compareComments);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.slice(0, MAX_COMMENTS_COUNT).map((review) => <Review key={review.id} review={review}/>)}
      </ul>
    </>
  );
}
