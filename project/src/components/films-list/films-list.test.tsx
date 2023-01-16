import { render, screen } from '@testing-library/react';
import FilmsList from './films-list';
import {MemoryRouter} from 'react-router-dom';
import films from '../../mocks/films';

describe('films-list tests', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <FilmsList films={films}/>
      </MemoryRouter>);
    expect(screen.getByText(films[0].name)).toBeInTheDocument();
    expect(screen.getByText(films[7].name)).toBeInTheDocument();
  });
});
