import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchFilm} from '../../store/api-actions';
import {ReducerName} from '../../types/reducer-name';
import Loading from '../../components/loading/loading';
import NotFoundPage from '../not-found-page/not-found-page';


function Player(): JSX.Element{
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const [viewedTime, setViewedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    dispatch(fetchFilm(id.toString()));
  }, [id, dispatch]);

  const film = useAppSelector((state) => state[ReducerName.Film].film);
  const isLoading = useAppSelector((state) => state[ReducerName.Film].isLoading);

  const playerRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const playerScreenRef = useRef() as MutableRefObject<HTMLDivElement>;

  if (playerRef && playerRef.current) {
    playerRef.current.ontimeupdate = () => {
      setViewedTime(playerRef.current.currentTime);
    };
  }

  function getTimeLeft() {
    if (film === null) {
      return '00:00';
    }
    const timeLeft = film.runTime * 60 - viewedTime;
    return [Math.floor(timeLeft / 3600),
      Math.floor((timeLeft / 60) % 60).toString().padStart(2, '0')]
      .join(':');
  }

  if (isLoading) {
    return (<Loading />);
  }

  return film ? (
    <div className='player' ref={playerScreenRef}>
      <video
        src={film.videoLink}
        className='player__video'
        poster={film.posterImage}
        ref={playerRef}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <Link to={`/films/${id}`} className='player__exit'>Exit</Link>

      <div className='player__controls'>
        <div className='player__controls-row'>
          <div className='player__time'>
            <progress className='player__progress' value={viewedTime / 60} max={film.runTime}></progress>
            <div className='player__toggler' style={{left: `${(viewedTime / (film.runTime * 60)) * 100}%`}}>Toggler</div>
          </div>
          <div className='player__time-value'>
            -{getTimeLeft()}
          </div>
        </div>

        <div className='player__controls-row'>
          {
            isPlaying ? (
              <button type="button" className="player__play" onClick={() => {playerRef.current.pause();}}>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>) : (
              <button type='button' className='player__play' onClick={() => {playerRef.current.play();}}>
                <svg viewBox='0 0 19 19' width='19' height='19'>
                  <use xlinkHref='#play-s'></use>
                </svg>
                <span>Play</span>
              </button>)
          }
          <div className='player__name'>Transpotting</div>

          <button type='button' className='player__full-screen'
            onClick={() => {
              document.fullscreenElement ?
                document.exitFullscreen() :
                playerScreenRef.current.requestFullscreen();
            }}
          >
            <svg viewBox='0 0 27 27' width='27' height='27'>
              <use xlinkHref='#full-screen'></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>)
    : <NotFoundPage />;
}

export default Player;
