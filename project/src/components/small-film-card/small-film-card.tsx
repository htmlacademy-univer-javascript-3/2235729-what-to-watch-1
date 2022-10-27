import { MouseEvent } from 'react';
import {Link} from 'react-router-dom';

type SmallFilmCardProps = {
  id: number;
  srcImg: string;
  title: string;
  srcPreviewVideo: string;
  isHovered: boolean;
  mouseOverHandler: (event: MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (hoverHandlerevent: MouseEvent<HTMLDivElement>) => void;
}

function SmallFilmCard(props: SmallFilmCardProps): JSX.Element{
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={props.mouseOverHandler} onMouseLeave={props.mouseLeaveHandler}>
      <div className="small-film-card__image">
        <img src={props.srcImg} alt={props.title} width='280' height='175'/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${props.id}`}>{props.title}</Link>
      </h3>
    </article>);
}
export default SmallFilmCard;
