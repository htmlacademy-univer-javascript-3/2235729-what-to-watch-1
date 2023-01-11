import React, {useEffect} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import СommentSubmissionForm from '../../components/сomment-submission-form/сomment-submission-form';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {ReducerName} from '../../types/reducerName';
import {fetchFilm} from '../../store/api-actions';


function AddReviewPage(): JSX.Element {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilm(id.toString()));
  }, [id, dispatch]);

  const film = useAppSelector((state) => state[ReducerName.Film].film);
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
                <a className="breadcrumbs__link" href="/#">Add review</a>
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
      <СommentSubmissionForm />
    </section>)
    : <Navigate to={'/*'}/>;
}

export default AddReviewPage;
