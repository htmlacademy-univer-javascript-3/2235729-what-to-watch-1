import Review from '../../types/review';

type ReviewsProps = {
  reviews: Review[];
}


function getDateString(date: Date) {
  return `${date.toLocaleString('eng', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`;
}


function Reviews({reviews}: ReviewsProps): JSX.Element {
  function Column({columnReviews}: {columnReviews: Review[]}): JSX.Element {
    return (
      <div className="film-card__reviews-col">
        {
          columnReviews.map((review) => (
            <div className="review" key={review.id}>
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={review.date}>{getDateString(new Date(review.date))}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          ))
        }
      </div>);
  }
  return (
    <div className="film-card__reviews film-card__row">
      <Column columnReviews={reviews.slice(0, Math.ceil(reviews.length / 2))}/>
      <Column columnReviews={reviews.slice(Math.ceil(reviews.length / 2), reviews.length)}/>
    </div>);
}

export default Reviews;
