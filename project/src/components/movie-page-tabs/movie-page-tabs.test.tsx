import { fireEvent, render, screen } from '@testing-library/react';
import films from '../../mocks/films';
import reviews from '../../mocks/reviews';
import MoviePageTabs from './movie-page-tabs';

const mockFilm = films[0];
const mockReviews = reviews;

describe('movie-page-tabs tests', () => {
  it('should render overview correctly', () => {
    render(<MoviePageTabs film={mockFilm} reviews={reviews} />);
    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
  });

  it('should render details correctly', () => {
    render(<MoviePageTabs film={mockFilm} reviews={reviews} />);

    const detailsButton = screen.getByTestId('Details');
    fireEvent.click(detailsButton);

    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });

  it('should render reviews correctly', () => {
    render(<MoviePageTabs film={mockFilm} reviews={reviews} />);

    const reviewsButton = screen.getByTestId('Reviews');
    fireEvent.click(reviewsButton);

    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
  });
});
