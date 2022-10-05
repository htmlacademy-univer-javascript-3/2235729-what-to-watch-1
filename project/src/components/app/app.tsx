import MainPage from '../../pages/main-page/main-page';

type MainPageProps = {
  title: string;
  genre: string;
  date: string;
}

function App(props: MainPageProps): JSX.Element {
  return <MainPage title={props.title} genre={props.genre} date={props.date}/>;
}

export default App;
