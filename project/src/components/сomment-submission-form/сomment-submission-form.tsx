import {ChangeEvent, useState, Fragment} from 'react';


function СommentSubmissionForm(): JSX.Element {
  const [review, setReview] = useState({ rating: 0, review: '' });
  const textChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => setReview({ ...review, [evt.target.name]: evt.target.value });
  const ratingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => setReview({ ...review, [evt.target.name]: evt.target.value });

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
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
            value={review.review}
            onChange={textChangeHandler}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>);
}

export default СommentSubmissionForm;
