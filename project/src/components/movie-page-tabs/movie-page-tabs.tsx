import Film from '../../types/film';
import Review from '../../types/review';
import Details from '../details/details';
import Reviews from '../reviews/reviews';
import Overview from '../overview/overview';
import React, {useState, FormEvent} from 'react';

const tabs = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews'
};

type MoviePageTabsProps = {
  film: Film;
  reviews: Review[];
}

function MoviePageTabs({film, reviews}: MoviePageTabsProps): JSX.Element {
  const [currentTab, setCurrentTab] = useState(tabs.OVERVIEW);
  const tabsNames = [];

  for (const key in tabs) {
    tabsNames.push(tabs[key as keyof typeof tabs]);
  }

  function changeTabHandle(event: FormEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setCurrentTab(event.currentTarget.id);
  }
  
  function TabFragment(): JSX.Element {
    if (currentTab === tabs.REVIEWS) {
      return (<Reviews reviews={reviews}/>);
    }
    if (currentTab === tabs.OVERVIEW) {
      return (<Overview film={film}/>);
    }
    if (currentTab === tabs.DETAILS) {
      return (<Details film={film}/>);
    }
    return (<React.Fragment />);
  }

  return film ? (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            tabsNames.map((name) => (
              <li className={`film-nav__item${name === currentTab ? ' film-nav__item--active' : ''}`} key={name}>
                <a className="film-nav__link" onClick={changeTabHandle} id={name}>{name}</a>
              </li>
            ))
          }
        </ul>
      </nav>
      <TabFragment />
    </div>) : <React.Fragment />;
}

export default MoviePageTabs;
