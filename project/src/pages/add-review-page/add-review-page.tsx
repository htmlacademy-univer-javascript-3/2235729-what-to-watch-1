import React from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import Film from '../../types/film';
import СommentSubmissionForm from '../../components/сomment-submission-form/сomment-submission-form';


type AddReviewPageProps = {
  films: Film[];
}


function AddReviewPage(props: AddReviewPageProps): JSX.Element {
  const id = Number(useParams().id);
  const film = props.films.find((f) => f.id === id);

  return film ? (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <title>WTW</title>
        <meta name="robots" content="noindex, nofollow"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="css/main.min.css"/>
      </head>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film.posterSrcImage} alt={film.title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${id}`} className="breadcrumbs__link">{film.title}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="/#">Add review</a>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <Link to='/login' className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film.posterSrcImage} alt={film.title}
              width="218" height="327"
            />
          </div>
        </div>
        <СommentSubmissionForm />
      </section>
    </html>)
    : <Navigate to={'/*'}/>;
}

export default AddReviewPage;
