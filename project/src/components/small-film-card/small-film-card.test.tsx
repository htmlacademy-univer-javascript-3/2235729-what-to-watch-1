import SmallFilmCard from './small-film-card';
import films from '../../mocks/films';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

const mockFilm = films[0];
describe('small-film-card tests', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard
          id={mockFilm.id}
          srcImg={mockFilm.previewImage}
          title={mockFilm.name}
          srcPreviewVideo={mockFilm.previewVideoLink}
          isHovered={false}
          mouseOverHandler={() => 0}
          mouseLeaveHandler={() => 0}
        />
      </MemoryRouter>);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
  });
});
