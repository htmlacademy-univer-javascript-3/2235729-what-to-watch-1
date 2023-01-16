import { render, screen } from '@testing-library/react';
import Reviews from './reviews';
import reviews from '../../mocks/reviews';


describe('reviews tests', () => {
  it('should render correctly', () => {
    render(<Reviews reviews={reviews}/>);
    expect(screen.getByText(reviews[0].user.name)).toBeInTheDocument();
    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(reviews[0].rating)).toBeInTheDocument();
    expect(screen.getByText(reviews[1].comment)).toBeInTheDocument();
  });
});
