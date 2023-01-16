import {ChangeEvent, useState, Fragment} from 'react';
import {FormEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {addReview} from '../../store/api-actions';


type ReviewSubmissionProps = {
  filmId: string;
}

function ReviewSubmissionForm({filmId}: ReviewSubmissionProps): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useAppDispatch();

  const textChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setReview(event.target.value);
  const ratingChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setRating(Number(event.target.value));

  function postReviewHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(addReview({filmId: filmId, rating: rating, comment: review}));
  }


  return (
    <div className="add-review">
      <form className="add-review__form" onSubmit={postReviewHandler}>
        <div className="rating">
          <div className="rating__stars">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
              <Fragment key={num}>
                <input
                  className="rating__input"
                  id={`star-${num}`}
                  type="radio"
                  name="rating"
                  value={num}
                  onChange={ratingChangeHandler}
                />
                <label className="rating__label" htmlFor={`star-${num}`}>
                  Rating {num}
                </label>
              </Fragment>)
            )}
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder={'Review Text'}
            value={review}
            onChange={textChangeHandler}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>);
}

export default ReviewSubmissionForm;
