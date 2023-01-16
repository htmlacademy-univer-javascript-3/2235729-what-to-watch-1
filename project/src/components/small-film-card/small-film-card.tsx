import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import PreviewVideoPlayer from '../preview-video-player/preview-video-player';

type SmallFilmCardProps = {
  id: number;
  srcImg: string;
  title: string;
  srcPreviewVideo: string;
  isHovered: boolean;
  mouseOverHandler: (event: MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (hoverHandlerEvent: MouseEvent<HTMLDivElement>) => void;
}

function SmallFilmCard({isHovered, srcImg, srcPreviewVideo, id, mouseLeaveHandler, mouseOverHandler, title}: SmallFilmCardProps): JSX.Element{
  const smallCardWidth = '280';
  const smallCardHeight = '175';

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}>
      <div className="small-film-card__image">
        {
          isHovered
            ? <PreviewVideoPlayer posterImage={srcImg} previewVideoSrc={srcPreviewVideo} width={smallCardWidth} height={smallCardHeight}/>
            : <img src={srcImg} alt={title} width={smallCardWidth} height={smallCardHeight}/>
        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </article>);
}
export default SmallFilmCard;
