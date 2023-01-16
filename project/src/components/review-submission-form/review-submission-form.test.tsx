import { render, screen } from '@testing-library/react';
import ReviewSubmissionForm from './review-submission-form';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('review-submission-form tests', () => {
  const store = mockStore();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewSubmissionForm filmId={'1'} />
        </MemoryRouter>
      </Provider>);
    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
