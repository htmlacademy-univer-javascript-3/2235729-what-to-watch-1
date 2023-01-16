import { render, screen } from '@testing-library/react';
import ShowMoreFilmsList from './show-more-films-list';
import { MemoryRouter } from 'react-router-dom';
import films from '../../mocks/films';


describe('show-more-films-list tests', () => {
  it('should render more button when count > 8', () => {
    render(
      <MemoryRouter>
        <ShowMoreFilmsList films={films} />
      </MemoryRouter>);
    const showMoreButton = screen.queryByTestId('show-more');
    expect(showMoreButton).toBeInTheDocument();
  });
  it('should not render more button when count <= 8', () => {
    render(
      <MemoryRouter>
        <ShowMoreFilmsList films={films.slice(0, 8)} />
      </MemoryRouter>);
    const showMoreButton = screen.queryByTestId('show-more');
    expect(showMoreButton).not.toBeInTheDocument();
  });
});
