import { useAppSelector } from '../../hooks/store';
import { getComments } from '../../store/offer/selectors';
import Review from '../review/review';

// type ReviewsListProps = {
//   reviews: ReviewType[];
// }

export default function ReviewsList(): JSX.Element {
  const reviews = useAppSelector(getComments);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={review.id} review={review}/>)}
      </ul>
    </>
  );
}
