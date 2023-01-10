import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchFilms, checkAuth, fetchPromo} from './store/api-actions'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement,);

store.dispatch(checkAuth());
store.dispatch(fetchFilms());
store.dispatch(fetchPromo());

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
