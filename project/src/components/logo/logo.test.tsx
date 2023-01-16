import { render, screen } from '@testing-library/react';
import Logo from './logo';
import {MemoryRouter} from 'react-router-dom';

describe('logo tests', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>);
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
