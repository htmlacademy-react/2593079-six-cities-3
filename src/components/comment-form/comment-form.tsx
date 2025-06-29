import { ChangeEvent, FormEvent, RefObject, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { postComment } from '../../store/api-action';
import { DEFAULT_RATING } from '../../const';

type CommentFormProps = {
  id: string;
}

const setBtn = (btnRef: RefObject<HTMLButtonElement>, type: 'on' | 'off') => {
  if(btnRef) {
    if(type === 'off') {
      btnRef.current?.setAttribute('disabled', 'true');
    } else if(type === 'on') {
      btnRef.current?.removeAttribute('disabled');
    }
  }
};

export default function CommentForm({id}: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [commentState, setState] = useState({
    comment: '',
    rating: DEFAULT_RATING
  });

  const commentFormRef = useRef<HTMLFormElement>(null);
  const textFormRef = useRef<HTMLTextAreaElement>(null);
  const ratingFormRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const onFormChange = () => {
    if(commentState.comment.length > 49 && commentState.comment.length < 301) {
      setBtn(submitBtnRef, 'on');
    } else {
      setBtn(submitBtnRef, 'off');
    }
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = commentState.comment;
    const rating = commentState.rating;

    if(!text || !rating) {
      return;
    }

    if(text.trim().length > 0 && rating) {
      dispatch(postComment({
        id,
        body: commentState
      }))
        .unwrap()
        .then(() => {
          setState({
            comment: '',
            rating: DEFAULT_RATING
          });
        });
    }
  };


  const handleRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({
      ...commentState,
      rating: Number(e.currentTarget.value),
    });
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setState({
    ...commentState,
    comment: e.currentTarget.value
  });

  return (
    <form className="reviews__form form" action="#" method="post" ref={commentFormRef} onSubmit={onFormSubmit} onChange={onFormChange}>
      <label className="reviews__label form__label" htmlFor="review">
                  Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={5}
          id="5-stars"
          type="radio"
          ref={ratingFormRef}
          checked = {commentState.rating === 5}

          onChange={handleRateChange}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={4}
          id="4-stars"
          type="radio"
          checked = {commentState.rating === 4}
          onChange={handleRateChange}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={3}
          id="3-stars"
          type="radio"
          checked = {commentState.rating === 3}

          onChange={handleRateChange}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={2}
          id="2-stars"
          type="radio"
          checked = {commentState.rating === 2}

          onChange={handleRateChange}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={1}
          id="1-star"
          type="radio"
          checked = {commentState.rating === 1}
          onChange={handleRateChange}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        ref={textFormRef}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={commentState.comment}
        onChange={handleTextChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                    To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
                    your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
          ref={submitBtnRef}
        >
                    Submit
        </button>
      </div>
    </form>
  );
}
