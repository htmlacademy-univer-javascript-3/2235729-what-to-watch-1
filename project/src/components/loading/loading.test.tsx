import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('loading tests', () => {
  it('should render correctly', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
