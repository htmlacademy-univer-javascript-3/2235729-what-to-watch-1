import Review from '../../types/review';

type ReviewsProps = {
  reviews: Review[];
}


function Reviews({reviews}: ReviewsProps): JSX.Element {
  const columns = [reviews.slice(0, reviews.length / 2 + Number(reviews.length !== 0)),
    reviews.slice(reviews.length / 2 + Number(reviews.length !== 0), reviews.length)];
  return (
    <div className="film-card__reviews film-card__row">
      {
        columns.map((column) => (
          <div className="film-card__reviews-col" key={`${column[0]?.id | 0}`}>
            {
              column.map((review) => (
                <div className="review" key={review.id}>
                  <blockquote className="review__quote">
                    <p className="review__text">{review.comment}</p>

                    <footer className="review__details">
                      <cite className="review__author">{review.user.name}</cite>
                      <time className="review__date" dateTime={review.date}>{review.date}</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">{review.rating}</div>
                </div>
              ))
            }
          </div>
        )
        )
      }
    </div>);
}

export default Reviews;
