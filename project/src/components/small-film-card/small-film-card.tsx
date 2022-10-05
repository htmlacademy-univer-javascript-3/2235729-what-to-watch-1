type SmallFilmCardProps = {
    src_img: string;
    film_name: string;
}

function SmallFilmCard(props: SmallFilmCardProps): JSX.Element{
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.src_img} alt={props.film_name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{props.film_name}</a>
      </h3>
    </article>);
}
export default SmallFilmCard;
