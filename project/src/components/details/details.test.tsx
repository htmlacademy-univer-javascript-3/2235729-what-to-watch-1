import { render, screen } from '@testing-library/react';
import films from '../../mocks/films';
import Details from './details';

const mockFilm = films[0];

describe('details tests', () => {
  it('should render correctly', () => {
    render(<Details film={mockFilm}/>);
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.starring.join(' '))).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });
});
