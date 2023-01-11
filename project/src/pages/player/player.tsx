import React, {useEffect} from 'react';
import {Link, useParams, Navigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchFilm} from '../../store/api-actions';
import {ReducerName} from '../../types/reducerName';


function Player(): JSX.Element{
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilm(id.toString()));
  }, [id, dispatch]);

  const film = useAppSelector((state) => state[ReducerName.Film].film);
  return film ? (
    <div className='player'>
      <video src={film.videoLink} className='player__video' poster={film.posterImage}></video>

      <Link to={`/films/${id}`} type='button' className='player__exit'>Exit</Link>

      <div className='player__controls'>
        <div className='player__controls-row'>
          <div className='player__time'>
            <progress className='player__progress' value='30' max='100'></progress>
            <div className='player__toggler' style={{left: '30%'}}>Toggler</div>
          </div>
          <div className='player__time-value'>{`${film.runTime / 60}:${film.runTime % 60}`}</div>
        </div>

        <div className='player__controls-row'>
          <button type='button' className='player__play'>
            <svg viewBox='0 0 19 19' width='19' height='19'>
              <use xlinkHref='#play-s'></use>
            </svg>
            <span>Play</span>
          </button>
          <div className='player__name'>Transpotting</div>

          <button type='button' className='player__full-screen'>
            <svg viewBox='0 0 27 27' width='27' height='27'>
              <use xlinkHref='#full-screen'></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>)
    : <Navigate to={'/*'}/>;
}

export default Player;
