import { render, screen } from '@testing-library/react';
import PlayButton from './play-button';
import films from '../../mocks/films';
import {MemoryRouter} from 'react-router-dom';

const mockFilm = films[0];
describe('play-button tests', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <PlayButton filmId={mockFilm.id}/>
      </MemoryRouter>);
    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
