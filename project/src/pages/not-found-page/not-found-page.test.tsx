import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';

describe('not-found-page tests', () => {
  it('should render correctly', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
