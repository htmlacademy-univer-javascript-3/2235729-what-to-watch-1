import React, {useEffect} from 'react';
import {Link, useParams, Navigate} from 'react-router-dom';
import СommentSubmissionForm from '../../components/review-submission-form/review-submission-form';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {ReducerName} from '../../types/reducer-name';
import {fetchFilm} from '../../store/api-actions';
import NotFoundPage from '../not-found-page/not-found-page';
import Loading from '../../components/loading/loading';
import AuthorizationStatus from '../../types/authorization-status';


function AddReviewPage(): JSX.Element {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilm(id.toString()));
  }, [id, dispatch]);

  const film = useAppSelector((state) => state[ReducerName.Film].film);
  const isLoading = useAppSelector((state) => state[ReducerName.Film].isLoading);
  const authStatus = useAppSelector((state) => state[ReducerName.Authorzation].authorizationStatus);

  if (authStatus === AuthorizationStatus.IN_PROCESS) {
    return (<Loading />);
  }

  if (authStatus === AuthorizationStatus.NOT_AUTHORIZED) {
    return (<Navigate to={'/login'}/>);
  }

  if (isLoading) {
    return (<Loading />);
  }

  return film ? (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.posterImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="review" className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name}
            width="218" height="327"
          />
        </div>
      </div>
      <СommentSubmissionForm filmId={id.toString()}/>
    </section>) : <NotFoundPage />;
}

export default AddReviewPage;
