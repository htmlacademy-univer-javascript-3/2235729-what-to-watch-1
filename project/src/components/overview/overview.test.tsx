import { render, screen } from '@testing-library/react';
import Overview from './overview';
import films from '../../mocks/films';

const mockFilm = films[0];
describe('overview tests', () => {
  it('should render correctly', () => {
    render(<Overview film={mockFilm}/>);
    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
  });
});
