import { ChangeEvent, FormEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { postComment } from '../../store/api-action';
import { DEFAULT_RATING } from '../../const';
import { setBtn } from '../../utils';

type CommentFormProps = {
  id: string;
}

function disableForm(form: HTMLFormElement) {
  if (form.elements) {
    Array.from(form.elements).forEach((el) => {
      if ('disabled' in el) {
        el.disabled = true;
      }
    });
  }
}

function enableForm(form: HTMLFormElement) {
  if (form.elements) {
    Array.from(form.elements).forEach((el) => {
      if ('disabled' in el) {
        (el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement).disabled = false;
      }
    });
  }
}

export default function CommentForm({id}: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [commentState, setState] = useState({
    comment: '',
    rating: DEFAULT_RATING
  });


  const commentFormRef = useRef<HTMLFormElement>(null);
  const textFormRef = useRef<HTMLTextAreaElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const onFormChange = () => {

  };

  useEffect(() => {
    const text = commentState.comment;
    const rating = commentState.rating;

    if(text.trim().length > 49 && text.trim().length < 301 && rating) {
      setBtn(submitBtnRef, 'on');
    } else {
      setBtn(submitBtnRef, 'off');
    }

  }, [commentState]);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!commentState.comment || !commentState.rating || !commentFormRef.current) {
      return;
    }

    disableForm(commentFormRef.current);

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
        enableForm(commentFormRef.current as HTMLFormElement);
        commentFormRef.current?.reset();
        setBtn(submitBtnRef, 'off');
      })
      .catch(() => {
        enableForm(commentFormRef.current as HTMLFormElement);
      });

  };


  const handleRateChange = (e: MouseEvent<HTMLInputElement>) => {
    setState({
      ...commentState,
      rating: Number(e.currentTarget.value),
    });
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({
      ...commentState,
      comment: e.currentTarget.value
    });
  };

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
          onClick={handleRateChange}
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
          onClick={handleRateChange}
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

          onClick={handleRateChange}
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

          onClick={handleRateChange}
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
          id="1-stars"
          type="radio"
          onClick={handleRateChange}
        />
        <label
          htmlFor="1-stars"
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
