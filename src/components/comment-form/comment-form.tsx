import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { postComment } from '../../store/api-action';

type CommentFormProps = {
  id: string;
}


export default function CommentForm({id}: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [commentState, setState] = useState({
    comment: '',
    rating: 0
  });

  const commentForm = useRef<HTMLFormElement>(null);
  const textForm = useRef<HTMLTextAreaElement>(null);
  const ratingForm = useRef<HTMLInputElement>(null);
  const submitBtn = useRef<HTMLButtonElement>(null);

  const onFormInput = () => {
    if(commentState.comment.length > 49 && commentState.rating !== 0) {
      submitBtn.current?.removeAttribute('disabled');
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
      }));

      setState({
        comment: '',
        rating: 0
      });
    }
  };


  const handleRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({
      ...commentState,
      rating: Number(e.target.value),
    });
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setState({
    ...commentState,
    comment: e.target.value
  });

  return (
    <form className="reviews__form form" action="#" method="post" ref={commentForm} onSubmit={onFormSubmit} onInput={onFormInput}>
      <label className="reviews__label form__label" htmlFor="review">
                  Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={commentState.rating}
          id="5-stars"
          type="radio"
          ref={ratingForm}
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
          defaultValue={4}
          id="4-stars"
          type="radio"
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
          defaultValue={3}
          id="3-stars"
          type="radio"
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
          defaultValue={2}
          id="2-stars"
          type="radio"
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
          defaultValue={1}
          id="1-star"
          type="radio"
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
        ref={textForm}
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={commentState.comment}
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
          ref={submitBtn}
        >
                    Submit
        </button>
      </div>
    </form>
  );
}
