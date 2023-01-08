
function HeadGuestPage(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src="img/bg-header.jpg" alt={''}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <div className="logo">
          <a className="logo__link" href="/#">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <a href="sign-in.html" className="user-block__link">Sign in</a>
        </div>
      </header>

    </section>);
}

export default HeadGuestPage;
